// MODAL functions (open close)
// let allModals = document.getElementsByClassName("modal");
// allModals.forEach(modal => {
//      modal.addEventListener()
// });

// all annotation btns
// annBtn id = annButton+book id
// modal id = .modal + annbtnID 
function addToggleModaltoAllCards() {
     let annButtons = document.querySelectorAll(".annotation-btn");//modal toggle
     let addAnnBtn = document.querySelectorAll(".addAnnBtn");

     for (let i = 0; i < annButtons.length; i++) {
          let currModal = document.querySelector(`.modal#modal${(annButtons[i].id).replace("annButton", "")}`);
          currModal.style.visibility = "hidden";

          annButtons[i].addEventListener("click", function () {
               if (currModal.style.visibility == "hidden") {
                    currModal.style.visibility = "visible";
               }
               else {
                    currModal.style.visibility = "hidden";
               }
          })
          // add each annotation button func to make get request for his annotations
          let currBookID = (annButtons[i].id).replace("annButton", "");
          annButtons[i].addEventListener("click", () => annotationGetRequest(currBookID));
          addAnnBtn[i].addEventListener("click", () => createNewAnnotation(currBookID));

     }

}

function createNewAnnotation(currBookID){
     // 1. Open modal for new annotation data
     console.log("open new form");
}

