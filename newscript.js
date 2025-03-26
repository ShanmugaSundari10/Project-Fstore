const app = initializeApp(appSettings);
const database = getDatabase(app);
const userListInDB = ref(database, "users");

const idEl = document.querySelector("#id");
const nameEl = document.querySelector("#name");
const ageEl  = document.querySelector("#age");
const cityEl = document.querySelector("#city");
const frm    = document.querySelector("#frm")
const btnSubmitEl = document.querySelector("#btnSubmit");
const tblBodyEl = document.querySelector("#tblBody");

frm.addEventListener("submit", function (e){
    e.preventDefault();
    if(!nameEl.value.trim() || !ageEl.value.trim() || !cityEl.value.trim())
        {
            alert("please fill all details");
            return;
        }
    if (idEl.value){
        set(ref(database,"users/"+idEl.value), {
            name: nameEl.value.trim(),
            age: ageEl.value.trim(),
            city: cityEl.value.trim(),
        });
        clearEl();
        return;
    }
    const newUser = {
        name: nameEl.value.trim(),
        age: ageEl.value.trim(),
        city: cityEl.value.trim(),
    };
    push(userListInDB, newUser);
    clearEl();
});

function clearEl(){
    nameEl.value = "";
    ageEl.value ="";
    cityEl.value ="";
    idEl.value ="";
}

onValue(userListInDB, function (snapshot){
    if (snapshot.exists()){
        let userArray = Object.entries(snapshot.val());
        console.log(userArray);
        for(let i=0; i<userArray.length; i++){
          let currentUser = userArray[i]
          console.log(currentUser);
          let currentUserId = currentUser[0];
          console.log(currentUserId);

          let currentUserValues = currentUser[1];
          tblBodyEl.innerHTML += 
           `<tr>
            <td>${i+1}</td>
            <td>${currentUserValues.name}</td>
            <td>${currentUserValues.age}</td>
            <td>${currentUserValues.city}</td>
            <td><button class="btn-edit" data-id =${currentUserId}><ion-icon name="create"></ion-icon></button></td>
            <td><button class="btn-delete" data-id =${currentUserId}><ion-icon name="trash"></ion-icon></button></td>
            </tr>` ;
        }     
    } else {
        console.log("No data Found");
    }
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
        let data = ref(database, `users/${id}`);
         console.log(data);
        remove(data);
        }
    }
})