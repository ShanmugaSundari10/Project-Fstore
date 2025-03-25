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
const btn_submit = document.querySelector("#btn_submit");

// adding values in to cloud firestore
async function Automatic_ID() {
    var ref = collection(database, "Users", );
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
      console.log(docRef);
}
//Assigning funciton to button
btn_submit.addEventListener("click",function(e){
    e.preventDefault();
    if(!nameEl.value.trim() || !ageEl.value.trim() || !cityEl.value.trim())
        {
            alert("please fill all details");
            return;
        }
    Automatic_ID();
    Clear_details();

    
});

function Clear_details(){
    nameEl.value ="";
    ageEl.value = "";
    cityEl.value ="";
}

async function Get_Document(){
   var ref = doc(database, "Users",)
}


// frm.addEventListener("submit", function(e){
//     e.preventDefault();
//     set(userListInDB,{
//        name: nameEl.value.trim(),
//        age: ageEl.value.trim(),
//        city: cityEl.value.trim(),
//     });
// })

// if (snapshot.exists()){
//     let userArray = Object.entries(snapshot.val());
//     console.log(userArray);
//     for(let i=0; i<userArray.length; i++){
//       let currentUser = userArray[i]
//       console.log(currentUser);
//       let currentUserId = currentUser[0];
//       console.log(currentUserId);

//       let currentUserValues = currentUser[1];
//       tblBodyEl.innerHTML += 
//        `<tr>
//         <td>${i+1}</td>
//         <td>${currentUserValues.name}</td>
//         <td>${currentUserValues.age}</td>
//         <td>${currentUserValues.city}</td>
//         <td><button class="btn-edit" data-id =${currentUserId}><ion-icon name="create"></ion-icon></button></td>
//         <td><button class="btn-delete" data-id =${currentUserId}><ion-icon name="trash"></ion-icon></button></td>
//         </tr>` ;
//     }     
// } else {
//     console.log("No data Found");
// }