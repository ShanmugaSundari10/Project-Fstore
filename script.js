import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBAVLzvvLF8o_CMJjxmy8l7ry9HhupB3RY",
  authDomain: "fstore-form.firebaseapp.com",
  projectId: "fstore-form",
  storageBucket: "fstore-form.firebasestorage.app",
  messagingSenderId: "571545274959",
  appId: "1:571545274959:web:98721d98827fe11fd6383a"
};

// Initialize Firebase App
const apps = initializeApp(firebaseConfig);
const database = getFirestore(apps);

// DOM elements
const idEl = document.querySelector("#id");
const nameEl = document.querySelector("#name");
const ageEl = document.querySelector("#age");
const cityEl = document.querySelector("#city");
const tblBodyEl = document.querySelector("#tblBody");
const btn_submit = document.querySelector("#btn_submit");

// Adding new user to Firestore on button click
btn_submit.addEventListener("click", async function (e) {
  e.preventDefault();

  if (!nameEl.value.trim() || !ageEl.value.trim() || !cityEl.value.trim()) {
    alert("Please fill in all details.");
    return;
  }

  try {
    // Add new user document to the "Users" collection
    const docRef = await addDoc(collection(database, "Users"), {
      name: nameEl.value.trim(),
      age: ageEl.value.trim(),
      city: cityEl.value.trim(),
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  // Clear the form after submission
  Clear_details();
});

// Function to clear form fields
function Clear_details() {
  nameEl.value = "";
  ageEl.value = "";
  cityEl.value = "";
}

// Real-time updates using onSnapshot
const usersRef = collection(database, "Users");  // Reference to "Users" collection

onSnapshot(usersRef, function(snapshot) {
  const usersArray = [];  // Array to hold user data

  snapshot.forEach(doc => {
    // Push each user's data into the array with document id
    usersArray.push({ id: doc.id, ...doc.data() });
  });

  console.log(usersArray);

  // Clear existing table body content
  tblBodyEl.innerHTML = "";

  // Populate table with user data
  usersArray.forEach((user, index) => {
    tblBodyEl.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.city}</td>
        <td><button class="btn-edit" data-id="${user.id}"><ion-icon name="create"></ion-icon></button></td>
        <td><button class="btn-delete" data-id="${user.id}"><ion-icon name="trash"></ion-icon></button></td>
      </tr>`;
  });
});
