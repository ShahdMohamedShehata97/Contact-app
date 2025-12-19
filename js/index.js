var fullName = document.getElementById("fullName");
var phoneNumber = document.getElementById("phoneNumber");
var emailAddress = document.getElementById("emailAddress");
var address = document.getElementById("address");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");
var modalElement = document.getElementById("exampleModal");
var contactShow = document.getElementById("contactShow");
var favContact = document.getElementById("favContact");
var searchInput = document.getElementById("searchInput");
var emerContact = document.getElementById("emerContact");
var total = document.getElementById("total");

var modalInstance =
  bootstrap.Modal.getInstance(contactShow) || new bootstrap.Modal(modalElement);

var contactList = [];

if (localStorage.getItem("contactStorage")) {
  contactList = JSON.parse(localStorage.getItem("contactStorage"));
  displayContact();
}
// function addContact(){
//     var contact={
//         cName:fullName.value,
//         cPhoneNumber:phoneNumber.value,
//         cEmailAddress:emailAddress.value,
//         cAddress:address.value

//     }

//     var phoneNum=contact.cPhoneNumber;
//     var boo=true
//     for(var i=0;i<contactList.length;i++){
//         if(phoneNum===contactList[i].cPhoneNumber){
//             boo=false
//             break
//         }
//     }

//     if(boo){
//         contactList.push(contact)

//     }
//     else{
//         Swal.fire({
//   icon: "error",
//   title: "Oops...",
//   text: "Something went wrong!",
//   footer: '<a href="#">Why do I have this issue?</a>'
// });

//     }

//     localStorage.setItem('contactStorage',JSON.stringify(contactList))
//     displayContact()

//     console.log(contactList)
// }





function addContact() {
  if (
    Validation(fullName) &&
    Validation(phoneNumber) &&
    Validation(emailAddress) &&
    Validation(address)
  ) {
    var contact = {
      cName: fullName.value,
      cPhoneNumber: phoneNumber.value,
      cEmailAddress: emailAddress.value,
      cAddress: address.value,
    };

    var phoneNum = contact.cPhoneNumber;
    var isUnique = true;
    var name;

    for (var i = 0; i < contactList.length; i++) {
      if (phoneNum === contactList[i].cPhoneNumber) {
        isUnique = false;
        name = contactList[i].cName;
        break;
      }
    }

    if (isUnique) {
      contactList.push(contact);
      localStorage.setItem("contactStorage", JSON.stringify(contactList));
      displayContact();

      Swal.fire({
        icon: "success",
        title: "Add",
        text: "Contact added successfully",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Duplicate Phone Number",
        text: "A contact with this phone number already exists:" + name,
      });
    }

    updateTotal();

    console.log(contactList);
  }
}






var form = document.forms[0];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    Validation(fullName) &&
    Validation(phoneNumber) &&
    Validation(emailAddress) &&
    Validation(address)
  ) 
  {
    
   if(btnStatus===false){
    updateFun()
   }
   else{
    addContact()
   }

    modalInstance.hide();
  }
});






function displayContact(list=contactList) {
  var box = "";
  for (var i = 0; i < list.length; i++) {
    var firstLetter;
    var secondLetter;
    for (var j = 0; j < list[i].cName.length; j++) {
      firstLetter = list[i].cName[0];
      if (list[i].cName[j] === " ") {
        secondLetter = list[i].cName[j + 1];
        break;
      }
    }

    box += `<div class="col-6">
                <div class="contact-item bg-white rounded-4">
                  <div class="contact-head d-flex gap-3">
                    <div
                      class="contact-letter font-18 fw-semibold from-main-to-second d-flex justify-content-center align-items-center rounded-3 text-white mt-3 ms-3"
                    >
                      ${firstLetter + secondLetter}
                    </div>

                    <div class="phone-name mt-3">
                      <h3 class="fs-6 fw-semibold">${list[i].cName}</h3>

                      <div class="phone-number d-flex gap-2 align-items-center">
                        <div
                          class="phone-icon bg-baby-blue d-flex justify-content-center align-items-center rounded-2"
                        >
                          <i class="fa-solid fa-phone"></i>
                        </div>
                        <span class="font-14 fw-normal text-secondary"
                          >${list[i].cPhoneNumber}</span
                        >
                      </div>
                    </div>
                  </div>

                  <div class="email mt-2 d-flex gap-2 align-items-center ms-3">
                    <div
                      class="email-icon d-flex justify-content-center align-items-center rounded-2"
                    >
                      <i class="fa-solid fa-envelope"></i>
                    </div>
                    <span class="font-14 fw-normal text-secondary"
                      >${list[i].cEmailAddress}</span
                    >
                  </div>

                  <div class="email mt-2 d-flex gap-2 align-items-center ms-3">
                    <div
                      class="location d-flex justify-content-center align-items-center rounded-2"
                    >
                      <i class="fa-solid fa-location-dot"></i>
                    </div>
                    <span class="font-14 fw-normal text-secondary">
                     ${list[i].cAddress}</span
                    >
                  </div>


                  <div
                    class="contact-bottom mt-3 d-flex justify-content-between align-items-center"
                  >

                    <div class="contact-left d-flex gap-3 ms-3">
                      <div
                        class="phone-icon bg-baby-blue d-flex justify-content-center align-items-center rounded-2"
                      >
                        <a href="tel:${list[i].cPhoneNumber}">
                        <i class="fa-solid fa-phone"></i></a>
                      </div>

                      <div
                        class="email-icon d-flex justify-content-center align-items-center rounded-2"
                      >
                        <i class="fa-solid fa-envelope"></i>
                      </div>
                    </div>

                    <div class="contact-buttons d-flex gap-3 p-3">
                      <button class="fav border-0 text-secondary" onclick="favorite(${i})">
                        <i class="fa-regular fa-star"></i>
                      </button>


                      <button class="emr border-0 text-secondary" onclick="emr(${i})">
                        <i class="fa-regular fa-heart"></i>
                      </button>


                      
                     <button 
  class="btn update border-0 text-secondary"
  data-bs-toggle="modal"
  data-bs-target="#exampleModal"
  onclick="editForUpdate(${i})"
>
  <i class="fa-solid fa-pen"></i>
</button>
                        <button class="delete border-0 text-secondary" onclick="deleteFun(${i})">
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>`;
  }

  contactShow.innerHTML = box;
}

var contactRegex = {
  fullName: /^[A-z][a-z]{2,}[\s]{1}[A-Z][a-z]{3,}$/,
  phoneNumber: /^(01)[0125][0-9]{8}$/,
  emailAddress: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$/,
  address: /^[A-z][\w]{4,}/,
};

function Validation(input) {
  if (contactRegex[input.id].test(input.value)) {
    input.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    input.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

///delete
function deleteFun(index) {
  contactList.splice(index, 1);
  Swal.fire({
    title: "Delete Contact?",
    text: "Are you sure you want to delete Shahd Mohammed Shehata? This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#6c757d",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Contact has been deleted.",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  });
  // console.log(contactList)
  localStorage.setItem("contactStorage", JSON.stringify(contactList));
  displayContact();
  updateTotal();
}

//update total
function updateTotal() {
  total.innerHTML = `<p class="mt-3 small-font fw-medium text-secondary">TOTAL</p>
              <p class="mt-20 fs-4 fw-bold">${contactList.length}</p>`;
}

updateTotal();

// editForUpdate
var globalIndex;
function editForUpdate(index) {
  globalIndex = index;
   btnStatus=false
  fullName.value = contactList[index].cName;
  phoneNumber.value = contactList[index].cPhoneNumber;
  emailAddress.value = contactList[index].cEmailAddress;
  address.value = contactList[index].cAddress;
}


//update
 var btnStatus=true
function updateFun() {
  contactList[globalIndex].cName = fullName.value;
  contactList[globalIndex].cPhoneNumber = phoneNumber.value;
  contactList[globalIndex].cEmailAddress = emailAddress.value;
  contactList[globalIndex].cAddress = address.value;
  
  localStorage.setItem("contactStorage", JSON.stringify(contactList));

  displayContact();
  
  
  
}

//search
 function searchFun() {
   var searchArr = [];
   var term = searchInput.value.trim().toLowerCase();

   for (var i = 0; i < contactList.length; i++) {
     if (contactList[i].cName.toLowerCase().includes(term)) {
       searchArr.push(contactList[i]);
     }
   }
   displayContact(searchArr);
 }



//favorite contacts
var favCont=[]

if (localStorage.getItem("favStorage")) {
  favCont = JSON.parse(localStorage.getItem("favStorage"));
  // displayContact();
  displayFav()
}

function favorite(index){
   var favNumber=favCont[index].cPhoneNumber
   var favUnique=true;

  for(var i=0;i<favCont.length;i++){
    if (favNumber === favCont[i].cPhoneNumber) {
        favUnique = false;
     
        break;
      }

  }

  if(favUnique){
     favCont.push(contactList[index])
localStorage.setItem("favStorage", JSON.stringify(favCont));
displayFav()

  }
 

}


function displayFav(){

  
  var box=''
  for (var i=0;i<favCont.length;i++){

     var firstLetter;
    var secondLetter;
    for (var j = 0; j < favCont[i].cName.length; j++) {
      firstLetter = favCont[i].cName[0];
      if (favCont[i].cName[j] === " ") {
        secondLetter = favCont[i].cName[j + 1];
        break;
      }
    }
    box+=` <div class="fav-lower d-flex gap-3 ms-3 py-3">
                <div class="fav-letter from-main-to-second d-flex justify-content-center align-items-md-center text-white rounded-2">
                  <span>${firstLetter + secondLetter}</span>
                </div>
                <div class="d-flex justify-content-between">

                  <div>
                    <h2 class="fs-6 fw-semibold">${favCont[i].cName}</h2>
                    <p class="small-font fw-normal mt-10">${favCont[i].cPhoneNumber}</p>
                  </div>

                  <div class="fav-phone ms-5 d-flex justify-content-center align-items-center">
                    <a href="tel:${favCont[i].cPhoneNumber}">
                    <i class="fa-solid fa-phone "></i></a>

                  </div>
                </div>

              </div>`

  }

  favContact.innerHTML=box
}



//emer
var emrCont=[]

if (localStorage.getItem("emrStorage")) {
  emrCont = JSON.parse(localStorage.getItem("emrStorage"));
  // displayContact();
  displayEmr()
}

function emr(index){
 
 var emrNumber=emrCont[index].cPhoneNumber
   var emrUnique=true;

  for(var i=0;i<favCont.length;i++){
    if (emrNumber === emrCont[i].cPhoneNumber) {
        emrUnique = false;
     
        break;
      }

  }

  if(emrUnique){
    emrCont.push(contactList[index])
localStorage.setItem('emrStorage',JSON.stringify(emrCont))
displayEmr()

  }
 

 

}


function displayEmr(){
  var box=''
  for (var i=0;i<emrCont.length;i++){

    var firstLetter;
    var secondLetter;
    for (var j = 0; j < emrCont[i].cName.length; j++) {
      firstLetter = emrCont[i].cName[0];
      if (emrCont[i].cName[j] === " ") {
        secondLetter = emrCont[i].cName[j + 1];
        break;
      }
    }
    box+=`<div class="fav-lower d-flex gap-3 ms-3 py-3">
                <div class="fav-letter from-main-to-second d-flex justify-content-center align-items-md-center text-white rounded-2">
                  <span>${firstLetter+secondLetter}</span>
                </div>
                <div class="d-flex justify-content-between">

                  <div>
                    <h2 class="fs-6 fw-semibold">${emrCont[i].cName}</h2>
                    <p class="small-font fw-normal mt-10">${emrCont[i].cPhoneNumber}</p>
                  </div>

                  <div class="fav-phone ms-5 d-flex justify-content-center align-items-center">
                  <a href="tel:${emrCont[i].cPhoneNumber}">
                    <i class="fa-solid fa-phone "></i></a>

                  </div>
                </div>

              </div>`

  }

  emerContact.innerHTML=box
}





