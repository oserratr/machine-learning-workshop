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

function setup() {
  createCanvas(400, 400);
  // Appel de la fonction pour lire les données
  readUserData();
  writeSwitch(true)
}

function draw() {
  background(220);
  
}

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
