// Classifier Variable
let classifier;

// Model URL Teachable machine
let imageModelURL = "https://teachablemachine.withgoogle.com/models/i4uBuskiy/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
// Track the last seen label to detect changes
let lastLabel = "";
// time in milliseconds
let duration = 2000;

// Sequence tracking variables many sequences
let sequence = ["haut", "bas", "gauche", "droite"];
let sequence2 = ["bas", "haut"];
let sequence3 = ["bas", "haut", "bas"];
let sequence4 = ["bas", "haut", "haut"];

let sequenceIndex = 0;
let labelStartTime = 0;

//index of poster
let indexPoster = 0;

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
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
  soundFormats("mp3");
  checkSound = loadSound("../sound/check-sound-effect");
  errorSound = loadSound("../sound/error-sound-effect");
  sucSound = loadSound("../sound/suc-sound-effect");
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

//Lire données
function readUserData() {
  const dbRef = firebase.database().ref();
  dbRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data.Poster1Switch);
    console.log(data.Poster2Switch);
    console.log(data.Poster3Switch);
    console.log(data.Poster4Switch);
    indexPoster = data.PosterIndex.PosterIndex;
    console.log(indexPoster);
  });
}

function writeSwitch1(val) {
  firebase.database().ref().update({
    Poster1Switch: val,
  });
}
function writeSwitch2(val) {
  firebase.database().ref().update({
    Poster2Switch: val,
  });
}
function writeSwitch3(val) {
  firebase.database().ref().update({
    Poster3Switch: val,
  });
}
function writeSwitch4(val) {
  firebase.database().ref().update({
    Poster4Switch: val,
  });
}
// When we get a result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;

  if (indexPoster == 0) {
    // Check if the label has changed
    if (label !== lastLabel) {
      // Update the last seen label
      lastLabel = label;
      // Reset the timer for the new label
      labelStartTime = millis();
    } else if (
      label === sequence[sequenceIndex] &&
      millis() - labelStartTime > duration
    ) {
      console.log("Next step!");
      // Move to the next label in the sequence if the current label has been recognized for more than 2 seconds
      sequenceIndex++;
      labelStartTime = millis(); // Reset the timer for the next label
      checkSound.play();

      if (sequenceIndex >= sequence.length) {
        console.log("Sequence completed!");
        // Optionally reset sequenceIndex to 0 to start over or handle completion differently
        sequenceIndex = 0; // Reset for demonstration

        writeSwitch1(true);
      }
    } else if (
      label !== sequence[sequenceIndex] &&
      millis() - labelStartTime > duration &&
      label !== "neutre"
    ) {
      errorSound.play();
      labelStartTime = millis();
      // noLoop();
    }
    document.querySelectorAll("canvas").forEach((canvas) => {
      if (canvas.style.display === "none") {
        canvas.remove();
      }
    });
    classifyVideo();
  }
  if (indexPoster == 1) {
    // Check if the label has changed
    if (label !== lastLabel) {
      // Update the last seen label
      lastLabel = label;
      // Reset the timer for the new label
      labelStartTime = millis();
    } else if (
      label === sequence2[sequenceIndex] &&
      millis() - labelStartTime > duration
    ) {
      console.log("Next step!");
      // Move to the next label in the sequence if the current label has been recognized for more than 2 seconds
      sequenceIndex++;
      labelStartTime = millis(); // Reset the timer for the next label
      checkSound.play();
      if (sequenceIndex >= sequence2.length) {
        console.log("Sequence completed!");
        // Optionally reset sequenceIndex to 0 to start over or handle completion differently
        sequenceIndex = 0; // Reset for demonstration
        writeSwitch2(true);
      }
    } else if (
      label !== sequence[sequenceIndex] &&
      millis() - labelStartTime > duration &&
      label !== "neutre"
    ) {
      errorSound.play();
      labelStartTime = millis();
      // noLoop();
    }
    document.querySelectorAll("canvas").forEach((canvas) => {
      if (canvas.style.display === "none") {
        canvas.remove();
      }
    });
    classifyVideo();
  }
  if (indexPoster == 2) {
    // Check if the label has changed
    if (label !== lastLabel) {
      // Update the last seen label
      lastLabel = label;
      // Reset the timer for the new label
      labelStartTime = millis();
    } else if (
      label === sequence3[sequenceIndex] &&
      millis() - labelStartTime > duration
    ) {
      console.log("Next step!");
      // Move to the next label in the sequence if the current label has been recognized for more than 2 seconds
      sequenceIndex++;
      labelStartTime = millis(); // Reset the timer for the next label
      checkSound.play();
      if (sequenceIndex >= sequence3.length) {
        console.log("Sequence completed!");
        // Optionally reset sequenceIndex to 0 to start over or handle completion differently
        sequenceIndex = 0; // Reset for demonstration
        writeSwitch3(true);
      }
    } else if (
      label !== sequence[sequenceIndex] &&
      millis() - labelStartTime > duration &&
      label !== "neutre"
    ) {
      errorSound.play();
      labelStartTime = millis();
      // noLoop();
    }
    document.querySelectorAll("canvas").forEach((canvas) => {
      if (canvas.style.display === "none") {
        canvas.remove();
      }
    });
    classifyVideo();
  }
  if (indexPoster == 3) {
    // Check if the label has changed
    if (label !== lastLabel) {
      // Update the last seen label
      lastLabel = label;
      // Reset the timer for the new label
      labelStartTime = millis();
    } else if (
      label === sequence4[sequenceIndex] &&
      millis() - labelStartTime > duration
    ) {
      console.log("Next step!");
      // Move to the next label in the sequence if the current label has been recognized for more than 2 seconds
      sequenceIndex++;
      labelStartTime = millis(); // Reset the timer for the next label
      checkSound.play();
      if (sequenceIndex >= sequence4.length) {
        console.log("Sequence completed!");
        // Optionally reset sequenceIndex to 0 to start over or handle completion differently
        sequenceIndex = 0; // Reset for demonstration
        sucSound.play();
        writeSwitch4(true);
      }
    } else if (
      label !== sequence[sequenceIndex] &&
      millis() - labelStartTime > duration &&
      label !== "neutre"
    ) {
      errorSound.play();
      labelStartTime = millis();
      // noLoop();
    }
    document.querySelectorAll("canvas").forEach((canvas) => {
      if (canvas.style.display === "none") {
        canvas.remove();
      }
    });
    classifyVideo();
  }
}
