import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, collection, addDoc, getDocs,onSnapshot,deleteDoc  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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
const btn_submit = document.querySelector("#btn_submit");

btn_submit.addEventListener("click", async function (e) {
  e.preventDefault();

  if (!nameEl.value.trim() || !ageEl.value.trim() || !cityEl.value.trim()) {
    alert("Please fill in all details.");
    return;
  }
  if (idEl.value){
    setDoc(collection(database,"Users/"+idEl.value), {
        name: nameEl.value.trim(),
        age: ageEl.value.trim(),
        city: cityEl.value.trim(),
    });
    clearEl();
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
  idEl.value ="";
}

// Real-time updates using onSnapshot
const usersRef = collection(database, "Users");  // Reference to "Users" collection

onSnapshot(usersRef, function(snapshot) {
  const usersArray = [];  

  snapshot.forEach(doc => {
    // Push each user's data into the array with document id
    usersArray.push({ id: doc.id, ...doc.data() });
  });

  console.log(usersArray);
  tblBodyEl.innerHTML = "";
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


document.addEventListener("click", function(e){
  if(e.target.classList.contains("btn-edit")){
      const id = e.target.dataset.id;
      console.log(e.target);
      console.log(e.target.dataset);
      console.log(id);

      const tdElement = e.target.closest("tr").children;
      idEl.value = id;
      nameEl.value = tdElement[1].textContent;
      ageEl.value = tdElement[2].textContent;
      cityEl.value = tdElement[3].textContent;

      } else if(e.target.classList.contains("btn-delete")){
      if(confirm("Are you sure to Delete?")){
          const id = e.target.dataset.id;
          console.log(e.target);
          console.log(e.target.dataset);
          console.log(id);
       let data = deleteDoc(doc(database, `Users/${id}`));
      // let data = collection(database, `);
       console.log(data);
      }
  }
})