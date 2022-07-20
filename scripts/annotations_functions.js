// MODAL functions (open close)
// let allModals = document.getElementsByClassName("modal");
// allModals.forEach(modal => {
//      modal.addEventListener()
// });

// all annotation btns
// annBtn id = annButton+book id
// modal id = .modal + annbtnID 
function addToggleModaltoAllCards() {
     let annButtons = document.querySelectorAll(".annotation-btn");

     for (let i = 0; i < annButtons.length; i++) {
          let currModal = document.querySelector(`.modal#modal${(annButtons[i].id).replace("annButton","")}`);
          currModal.style.visibility = "hidden";

          annButtons[i].addEventListener("click", function () {
               if (currModal.style.visibility == "hidden") {
                    currModal.style.visibility = "visible";
               }
               else {
                    currModal.style.visibility = "hidden";
               }
          })
     }
}

