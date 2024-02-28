// Classifier Variable
let classifier;

// Model URL Teachable machine
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/PuSlr2sh4/';

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
// Track the last seen label to detect changes
let lastLabel = ""; 
// time in milliseconds
let duration = 2000

// Sequence tracking variables
let sequence = ["haut", "bas"];
let sequenceIndex = 0;
let labelStartTime = 0;


// Configuration Firebase
var firebaseConfig = {
  apiKey: "AIzaSyA2GpdJy8QUSxScI_5HWOBiKsT1wH-yvJ0",
  authDomain: "gobelindb.firebaseapp.com",
  databaseURL:
    "https://gobelindb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gobelindb",
  storageBucket: "gobelindb.appspot.com",
  messagingSenderId: "885373004687",
  appId: "1:885373004687:web:a76d2f64798f4708f779fa",
};

// Initialisation de Firebase
firebase.initializeApp(firebaseConfig);

// Référence à la base de données
var database = firebase.database();

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(400, 400);
  // Appel de la fonction pour lire les données
  readUserData();
  
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  classifyVideo();
  
  
  //chaner valeur switch
  //writeSwitch(true)
}

function draw() {
  background(0);
  flippedVideo = ml5.flipImage(video);
  image(flippedVideo, 0, 0);

  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);
  
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;

  // Check if the label has changed
  if (label !== lastLabel) {
    // Update the last seen label
    lastLabel = label; 
    // Reset the timer for the new label
    labelStartTime = millis(); 
  } else if (label === sequence[sequenceIndex] && millis() - labelStartTime > duration) {
    console.log("Next step!");
    // Move to the next label in the sequence if the current label has been recognized for more than 2 seconds
    sequenceIndex++;
    if (sequenceIndex >= sequence.length) {
      console.log("Sequence completed!");
      // Optionally reset sequenceIndex to 0 to start over or handle completion differently
      sequenceIndex = 0; // Reset for demonstration
      writeSwitch(true)
    }
    labelStartTime = millis(); // Reset the timer for the next label
  }

  classifyVideo();
}

//Lire données
function readUserData() {
  const dbRef = firebase.database().ref();
  dbRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data.switching);
  });
}

function writeSwitch(val) {
  firebase.database().ref().set({
    switching: val,
  });
}


