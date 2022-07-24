
// annBtn id = annButton+book id
// modal id = .modal + annbtnID 
// 1.get all cards annotations(button) and add them toggle (show/hide)
// 2.get all cards "add NEW annotation" button and add them function (create annotation)
// function addToggleModaltoAllCards() {
//      let annButtons = document.querySelectorAll(".annotation-btn");//modal toggle
//      let addAnnBtn = document.querySelectorAll(".addAnnBtn");

//      for (let i = 0; i < annButtons.length; i++) {
//           debugger;
//           let currModal = document.querySelector(`.modal#modal${(annButtons[i].id).replace("annButton", "")}`);
//           currModal.style.visibility = "hidden";


//           annButtons[i].addEventListener("click", function () {
//                if (currModal.style.visibility == "hidden") {
//                     currModal.style.visibility = "visible";
//                }
//                else {
//                     currModal.style.visibility = "hidden";
//                }
//           })
//           // add each annotation button func to make get request for his annotations
//           let currBookID = (annButtons[i].id).replace("annButton", ""); 
//           annButtons[i].addEventListener("click", () => annotationGetRequest(currBookID));
//           addAnnBtn[i].addEventListener("click", () => createNewAnnotation(currBookID));


//      }

// }

function createNewAnnotation(currBookID) {
     openFormModal(currBookID);
}

// 1.If invoke openFormModal(currBookID) - open modal and create new annotation
// 2.If invoke openFormModal(currBookID,editAnnID) - open modal and edit old annotation
function openFormModal(currBookID, editAnnID) {
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
     // input additional validation properties
     inputTextTitle.maxLength = 40;
     inputTextTitle.required = true;
     inputTextTitle.autocomplete = "off";
     let annotationContentP = document.createElement("p");
     annotationContentP.innerText = "annotation content:";
     let textArea = document.createElement("textarea");
     textArea.name = "annotationContentP";
     textArea.cols = "30";
     textArea.rows = "10";
     textArea.maxLength = 256;
     let saveBtn = document.createElement("button");
     saveBtn.innerText = "save";
     saveBtn.className = "ann-form-btn";


     // if edit - > fetch old ann data and put it into FORM
     let oldAnn;
     if (editAnnID) {
          console.log(editAnnID);
          fetch(`http://localhost:3000/api/annotations/${editAnnID}`)//fet all anotations then sort by bookId
               .then(res => {
                    if (!res.ok) {
                         console.log("annotation get status code: " + res.status);
                         throw new Error("fail annotation get method")
                    }
                    return res.json();
               })
               .then(data => {
                    inputTextTitle.value = data.title;
                    textArea.value = data.content;
                    oldAnn = data;
               })
               .catch(err => {
                    console.log(err.message);
               })
     }
     // save btn is diable if inputs are incorrect
     inputTextTitle.addEventListener("input", function () {
          if (inputTextTitle.value.length > 2 && textArea.value.length>2) {
               saveBtn.disabled = false;
               saveBtn.style.opacity = 1;
          }
          else{
               saveBtn.disabled = true;
               saveBtn.style.opacity = 0.5;
          }
     })
     textArea.addEventListener("input", function () {
          if (inputTextTitle.value.length > 2 && textArea.value.length>2) {
               saveBtn.disabled = false;
               saveBtn.style.opacity = 1;
          }
          else{
               saveBtn.disabled = true;
               saveBtn.style.opacity = 0.5;
          }
     })
     if(inputTextTitle.value.length < 2){
          saveBtn.disabled = true;
          saveBtn.style.opacity = 0.5;
     }
     // _____________________________________________
     saveBtn.addEventListener("click", function (event) {
          event.preventDefault();
          // validating input values
          if(inputTextTitle.value.trim().length<2 || textArea.value.trim().length<2){
               alert("************************************************\n Fill out the form properly! (min 3 chars in field)")
               return;
          }
          const formData = new FormData(form);
          let createDate = new Date().toLocaleString();//7/21/2022, 3:14:53 PM good format
          let annObj;
          if (editAnnID) {
               annObj = {
                    ...oldAnn,
                    "title": `${formData.get("inputTextTitle")}`,
                    "content": `${formData.get("annotationContentP")}`,
                    "timeOFEdit": `${createDate}`
               };

               annotationEditRequest(editAnnID, annObj);//oldAnnObj/updatedAnn obj
          }
          else {
               annObj = {
                    "title": `${formData.get("inputTextTitle")}`,
                    "content": `${formData.get("annotationContentP")}`,
                    "timeOfCreation": `${createDate}`,
                    "timeOFEdit": `${createDate}`,
                    "book": `${currBookID}`
               };

               annotationPostRequest(annObj);
          }
          
          // close Form modal after save btn clicked
          formContainer.remove();

     })

     form.append(titleP, inputTextTitle, annotationContentP, textArea, saveBtn);

     formContainer.append(closeButton, form);

     let bodyHTML = document.getElementsByTagName("body")[0];
     bodyHTML.append(formContainer);

}

