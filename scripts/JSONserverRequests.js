// ________________________\
let test = document.getElementById("test");
test.addEventListener("click", async function () {
     // debugger;
     // GET
     // fetch(`http://localhost:3000/api/posts/8`) //post id 8
     //      .then(res => {
     //           if (!res.ok) {
     //                throw new Error("bad fetch")
     //           }
     //           else {
     //                return res.json();
     //           }
     //      })
     //      .then(data => {
     //           console.log(data);
     //      })
     //      .catch(err => {
     //           console.log(err.message);
     //      })

     // post request- create 
     // put - update (!!! BODY - ENTIRE NEW OBJECT WITH ALL PROPS)
     //patch - update (!!! body obj - only updated props)
     // fetch(`http://localhost:3000/api/posts/15`, {
     //      method: "PATCH", //PUT / Post/ ! Patch
     //      headers: {
     //           'Content-Type': 'application/json',
     //      },
     //      body: JSON.stringify({
     //           title: "PATCH new test name ",
     //           author: "new test author"

     //      })
     // })
     //      .then(res => {
     //           if (!res.ok) {
     //                throw new Error("bad POST request")
     //           }
     //           else {
     //                return res.json();
     //           }
     //      })
     //      .then(data => {
     //           console.log(data);
     //      })
     //      .catch(err => {
     //           console.log(err.message);
     //      })

     // DELETE
     // fetch(`http://localhost:3000/api/posts/14`, {
     //      method: "DELETE"
     // })
     //      .then(res => {
     //           if (!res.ok) {
     //                console.log(`response object status code: ${res.status}`);
     //                throw new Error("bad DELETE request")
     //           }
     //           else {
     //                console.log(`response object status code: ${res.status}`);
     //                return res.json();
     //           }
     //      })
     //      .then(data => {
     //           console.log(data);
     //      })
     //      .catch(err => console.log(err.message))




})


// favourites page JSON server BOOK requests______________________________
function postRequest(book) {
     fetch(`http://localhost:3000/api/favourites/`, {
          method: "POST",
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(book)
     })
          .then(res => {
               if (!res.ok) {
                    throw new Error("bad POST request")
               }
               else {
                    return res.json();
               }
          })
          .then(data => {
               console.log(data);
          })
          .catch(err => {
               console.log(err.message);
          })

}

function getRequest() {
     let favPage = document.getElementsByClassName("cards-container-fav")[0];
     fetch(`http://localhost:3000/api/favourites/`)
          .then(res => {
               if (!res.ok) {
                    throw new Error("bad fetch")
               }
               else {
                    return res.json();
               }
          })
          .then(data => {
               console.log(`JSON server data: ${data}`);
               // add to fav page and print
               data.forEach(book => {
                    createAppendCard(book, favPage)

               });
          })
          .then(() => {
               removeButtonAddListener();
               addToggleModaltoAllCards();
          })
          .catch(err => {
               console.log(err.message);
          })
}

function deleteRequest(bookID) {
     fetch(`http://localhost:3000/api/favourites/${bookID}`, {
          method: "DELETE"
     })
          .then(res => {
               if (!res.ok) {
                    console.log(`response object status code: ${res.status}`);
                    throw new Error("bad DELETE request")
               }
               else {
                    console.log(`response object status code: ${res.status}`);
                    return res.json();
               }
          })
          .then(data => {
               console.log(data);
               let parentElement = document.getElementById(`cardContainer${(bookID)}`);
               parentElement.remove();
          })
          .catch(err => console.log(err.message))
}

// annotations requests ____________________________________
// get annotations for current book
function annotationGetRequest(bookID) {
     // debugger;
     fetch(`http://localhost:3000/api/annotations/${bookID}`)
          .then(res => {
               if (!res.ok) {
                    console.log("annotation get status code: " + res.status);
                    throw new Error("fail annotation get method")
               }
               return res.json();
          })
          .then(data => {
               console.log(data);
               // add anotations to book- modal card
               let currAnnWrapper = document.getElementById(`annotationsWrapper${bookID}`);
               currAnnWrapper.innerHTML = "";
               // create modal content box (date,title,content ...) and append it
               data.annotationCollection.forEach(annotation => {
                    createModalContentElement(annotation, currAnnWrapper);
               })

          })
          .catch(err => {
               console.log(err.message);
          })

     function createModalContentElement(annObj, currAnnWrapper) {
          // content - title, text,date 
          let modalContent = document.createElement("div");
          modalContent.className = "modal-content";
          let modalDateBox = document.createElement("div");
          modalDateBox.className = "modal-date";
          let modalTextBox = document.createElement("div");
          modalTextBox.className = "modal-text";

          // order obj props in boxes
          let createDate = document.createElement("p");
          createDate.innerText = `created on:${annObj.timeOfCreation}`;
          let editedDate = document.createElement("p");
          editedDate.innerText = `edited on:${annObj.timeOFEdit}`;
          let title = document.createElement("h6");
          title.innerText = `${annObj.title}`;
          let content = document.createElement("p");
          content.innerText = `${annObj.content}`;

          modalDateBox.append(createDate, editedDate);
          modalTextBox.append(title, content);

          // add buttons EDIT - DELETE annotation
          let modalBtnsContainer = document.createElement("div");
          modalBtnsContainer.className = "modal-buttons-container";
          let editBtn = document.createElement("button");
          editBtn.innerText = "Edit";
          let deleteBtn = document.createElement("button");
          deleteBtn.innerText = "Delete";

          modalBtnsContainer.append(editBtn,deleteBtn);

          modalTextBox.append(modalBtnsContainer)
          modalContent.append(modalDateBox, modalTextBox)
          // add edit delete btns functions




          
          currAnnWrapper.append(modalContent);
          //content: "ann1 content"
          // id: "1"
          // timeOFEdit: "12:00"
          // timeOfCreation: "11:00"
          // title: "ann1 title"

     }


}

