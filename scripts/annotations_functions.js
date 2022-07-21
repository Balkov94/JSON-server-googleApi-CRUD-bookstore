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

function createNewAnnotation(currBookID) {
     // 1. Open modal for new annotation data
     console.log("open new form");
     openFormModal(currBookID);
}


function openFormModal(currBookID) {
     let formContainer = document.createElement("div");
     formContainer.className = "ann-form-container";

     let closeButton = document.createElement("div");
     closeButton.className = "close-modal-form";
     let closeButtonX = document.createElement("h1");
     closeButtonX.innerText = "X";
     closeButton.addEventListener("click", function () {
          formContainer.remove();
     })
     closeButton.append(closeButtonX);

     let form = document.createElement("form");
     form.id = `form${currBookID}`;
     form.action = "submit";
     form.className = "ann-form";
     let titleP = document.createElement("p");
     titleP.innerText = "Title:";
     let inputTextTitle = document.createElement("input");
     inputTextTitle.type = "text";
     inputTextTitle.name = "inputTextTitle";
     let annotationContentP = document.createElement("p");
     annotationContentP.innerText = "annotation content:";
     let textArea = document.createElement("textarea");
     textArea.name = "annotationContentP";
     textArea.cols = "30";
     textArea.rows = "10";
     let saveBtn = document.createElement("button");
     saveBtn.innerText = "save";
     saveBtn.className = "ann-form-btn";

     saveBtn.addEventListener("click", function (e) {
          e.preventDefault();
          const formData = new FormData(form);
          console.log(formData.get("inputTextTitle"));
          console.log(formData.get("annotationContentP"));
          let createDate = new Date().toLocaleString();//7/21/2022, 3:14:53 PM good format
          let annObj = {
               "title": `${formData.get("inputTextTitle")}`,
               "content": `${formData.get("annotationContentP")}`,
               "timeOfCreation": `${createDate}`,
               "timeOFEdit": `${createDate}`,
               "book":`${currBookID}`,

          };
          // post annObj
          annotationPostRequest(annObj);
     })



     form.append(titleP, inputTextTitle, annotationContentP, textArea, saveBtn);

     formContainer.append(closeButton, form);

     let bodyHTML = document.getElementsByTagName("body")[0];
     bodyHTML.append(formContainer);







}

