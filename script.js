import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, collection, addDoc, getDocs  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

// Initialize Firebase
// Import Firebase modules (if using Firebase SDK 9 or above)

  // Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBAVLzvvLF8o_CMJjxmy8l7ry9HhupB3RY",
    authDomain: "fstore-form.firebaseapp.com",
    projectId: "fstore-form",
    storageBucket: "fstore-form.firebasestorage.app",
    messagingSenderId: "571545274959",
    appId: "1:571545274959:web:98721d98827fe11fd6383a"
  };

  // Initialize Firebase
const apps = initializeApp(firebaseConfig);


// const apps = initializeApp(appSettings);
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
frm.addEventListener("submit",function(e){
    e.preventDefault();
    Automatic_ID();
});


// frm.addEventListener("submit", function(e){
//     e.preventDefault();
//     set(userListInDB,{
//        name: nameEl.value.trim(),
//        age: ageEl.value.trim(),
//        city: cityEl.value.trim(),
//     });
// })