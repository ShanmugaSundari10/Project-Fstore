import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Initialize Firebase
// Import Firebase modules (if using Firebase SDK 9 or above)
const appSettings = {
    databaseURL: "https://tint-f9a50-default-rtdb.firebaseio.com"
};
const firebaseConfig = {
    apiKey: "AIzaSyCZxXj6sLI_kjnwgGEnNtsRJOMBAtaZUHM",
    authDomain: "tint-f9a50.firebaseapp.com",
    databaseURL: "https://tint-f9a50-default-rtdb.firebaseio.com",
    projectId: "tint-f9a50",
    storageBucket: "tint-f9a50.firebasestorage.app",
    messagingSenderId: "1054758787608",
    appId: "1:1054758787608:web:1f6b1a18a3941d1727016d",
    measurementId: "G-E3HHXSLJ1L"
  };

const apps = initializeApp(appSettings);
const database = getFirestore(apps);
// getting id reference
const idEl = document.querySelector("#id");
const nameEl = document.querySelector("#name");
const ageEl = document.querySelector("#age");
const cityEl = document.querySelector("#city");
const frm = document.querySelector("#frm");
const tblBodyEl = document.querySelector("#tblBody");

// adding values in to cloud firestore
async function Automatic_ID() {
    var ref = collection(database, "Users");
    const docRef = await addDoc(
        ref, {
            name: nameEl.value.trim(),
            age: ageEl.value.trim(),
            city: cityEl.value.trim(),
        }
    )
    .then(() => {
        alert("Data saved successfully!");
      })
      .catch((error) => {
        alert("Error saving data: ", error);
      });
}
//Assigning funciton to button
frm.addEventListener("submit",Automatic_ID());


// frm.addEventListener("submit", function(e){
//     e.preventDefault();
//     set(userListInDB,{
//        name: nameEl.value.trim(),
//        age: ageEl.value.trim(),
//        city: cityEl.value.trim(),
//     });
// })