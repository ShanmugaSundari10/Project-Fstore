import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getFirestore, doc, collection, addDoc, getDocs, onSnapshot  } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";

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
    
}
//Assigning funciton to button
btn_submit.addEventListener("click",function(e){
    e.preventDefault();
    if(!nameEl.value.trim() || !ageEl.value.trim() || !cityEl.value.trim())
        {
            alert("please fill all details");
            return;
        }
        if (idEl.value){
          // set(ref(database,"users/"+idEl.value), {
          //     name: nameEl.value.trim(),
          //     age: ageEl.value.trim(),
          //     city: cityEl.value.trim(),
          // });
          // clearEl();
          return;
      }
      try {
          const docRef = addDoc(collection(database, "Users"), {
              name: nameEl.value.trim(),
              age: ageEl.value.trim(),
              city: cityEl.value.trim(),
          });
          console.log("Document written with ID: ", docRef.id);
  
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    Clear_details();

    
});

function Clear_details(){
    nameEl.value ="";
    ageEl.value = "";
    cityEl.value ="";
}
const querySnapshot = await getDocs(collection(database, "Users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
const usersRef = collection(database, "Users");
onSnapshot(usersRef, function(snapshot){
    // if(snapshot.exists()){
      // const querySnapshot = getDocs(collection(database, "Users"));
      let userArray = Object.entries(snapshot.val());
        console.log(userArray);
    // }
})


