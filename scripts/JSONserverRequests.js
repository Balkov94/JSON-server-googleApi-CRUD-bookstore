// ________________________\
// let test = document.getElementById("test");
// test.addEventListener("click", async function () {
//      // debugger;
//      // GET
//      fetch(`http://localhost:3000/api/annotations/`) //post id 8
//           .then(res => {
//                if (!res.ok) {
//                     throw new Error("bad fetch")
//                }
//                else {
//                     return res.json();
//                }
//           })
//           .then(data => {
//                console.log(data);
//           })
//           .catch(err => {
//                console.log(err.message);
//           })

//      // post request- create 
//      // put - update (!!! BODY - ENTIRE NEW OBJECT WITH ALL PROPS)
//      //patch - update (!!! body obj - only updated props)
//      // fetch(`http://localhost:3000/api/posts/15`, {
//      //      method: "PATCH", //PUT / Post/ ! Patch
//      //      headers: {
//      //           'Content-Type': 'application/json',
//      //      },
//      //      body: JSON.stringify({
//      //           title: "PATCH new test name ",
//      //           author: "new test author"

//      //      })
//      // })
//      //      .then(res => {
//      //           if (!res.ok) {
//      //                throw new Error("bad POST request")
//      //           }
//      //           else {
//      //                return res.json();
//      //           }
//      //      })
//      //      .then(data => {
//      //           console.log(data);
//      //      })
//      //      .catch(err => {
//      //           console.log(err.message);
//      //      })

//      // DELETE
//      // fetch(`http://localhost:3000/api/posts/14`, {
//      //      method: "DELETE"
//      // })
//      //      .then(res => {
//      //           if (!res.ok) {
//      //                console.log(`response object status code: ${res.status}`);
//      //                throw new Error("bad DELETE request")
//      //           }
//      //           else {
//      //                console.log(`response object status code: ${res.status}`);
//      //                return res.json();
//      //           }
//      //      })
//      //      .then(data => {
//      //           console.log(data);
//      //      })
//      //      .catch(err => console.log(err.message))




// })


// favourites page JSON server BOOKs requests______________________________
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
                    console.log("post book status code:" + res.status);
                    if (res.status == 500) {
                         throw new Error("This book is already in favourites!")
                    }
                    throw new Error("bad POST request")
               }
               else {
                    return res.json();
               }
          })
          .then(data => {
               console.log(data);
               alert(`The book "${data.volumeInfo.title}" was added to Favourites`)
               let disableFavButton = document.getElementById(`favButton${book.id}`)
               disableFavButton.disabled = true;
          })
          .catch(err => {
               // console.log(err.message);
               alert(err.message)
          })

}

function getRequest() {
     let favPage = document.getElementsByClassName("cards-container-fav")[0];
     fetch(`http://localhost:3000/api/favourites/`)
          .then(res => {
               if (!res.ok) {
                    throw new Error("bad fetch books")
               }
               else {
                    return res.json();
               }
          })
          .then(data => {
               // add to fav page and print
               data.reverse();
               data.forEach(book => {
                    createAppendCard(book, favPage)
               });
          })
          .catch(err => {
               console.log("why entered here?");
               console.log(err.message);
               console.log(err);
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
               alert(`The book was remmoved from favourites.`)
          })
          .catch(err => console.log(err.message))
}


// *********************************************************
// annotations requests ____________________________________
// get annotations for current book
function annotationGetRequest(bookID) {
     // debugger;
     fetch(`http://localhost:3000/api/annotations/`)//fet all anotations then sort by bookId
          .then(res => {
               if (!res.ok) {
                    console.log("annotation get status code: " + res.status);
                    throw new Error("fail annotation get method")
               }
               return res.json();
          })
          .then(data => {
               const currBookCollection = data.filter(annotation => {
                    if (annotation.book == bookID) {
                         return annotation;
                    }
               })
               currBookCollection.reverse();
               currBookCollection.forEach(currAnnObj => {
                    createModalContentElement(currAnnObj);
               })

          })
          .catch(err => {
               console.log(err.message);
          })

     function createModalContentElement(currAnnObj, currAnnWrapper) {
          // content - title, text,date 
          let modalContent = document.createElement("div");
          modalContent.className = "modal-content";
          let modalDateBox = document.createElement("div");
          modalDateBox.className = "modal-date";
          let modalTextBox = document.createElement("div");
          modalTextBox.className = "modal-text";

          // order obj props in boxes
          let createDate = document.createElement("p");
          createDate.innerText = `Created on: ${currAnnObj.timeOfCreation}`;
          let editedDate = document.createElement("p");
          editedDate.innerText = `Edited on: ${currAnnObj.timeOFEdit}`;
          let title = document.createElement("h6");
          title.innerText = `${currAnnObj.title}`;
          let content = document.createElement("p");
          content.innerText = `${currAnnObj.content}`;

          modalDateBox.append(createDate, editedDate);
          modalTextBox.append(title, content);

          modalContent.append(modalDateBox, modalTextBox)


          let annotationsWrapper = document.getElementsByClassName(`annotationsWrapper${currAnnObj.book}`);
          // !!! FIX working with cloneNode-> to show in favPage and home the same annotations in the same time
          for (let i = 0; i < annotationsWrapper.length; i++) {
               let cloneNode = modalContent.cloneNode(true);
               // 
               let modalBtnsContainer = document.createElement("div");
               modalBtnsContainer.className = "modal-buttons-container";
               let editBtn = document.createElement("button");
               editBtn.innerText = "Edit";
               let deleteBtn = document.createElement("button");
               deleteBtn.innerText = "Delete";
               // ann - delete button
               deleteBtn.addEventListener("click", function () {
                    // debugger;
                    annotationDeleteRequest(currAnnObj);
                    // modalContent.remove(); NOT WORKING
                    // how problem when card is in Fav + Home

               })

               // ann - edin button
               editBtn.addEventListener("click", function () {
                    openFormModal(currAnnObj.book, currAnnObj.id)// bookID / annID
               })

               modalBtnsContainer.append(editBtn, deleteBtn);
               cloneNode.append(modalBtnsContainer);

               annotationsWrapper[i].append(cloneNode);
          }

     }


}

function annotationPostRequest(newAnnObj) {
     fetch(`http://localhost:3000/api/annotations/`, {
          method: "POST",
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAnnObj)
     })
          .then(res => {
               if (!res.ok) {
                    console.log(res.status);
                    return new Error("post new annotation error")
               }
               return res.json();
          })
          .then(data => {
               console.log(data);
               // close modal for forse fetch (get)
               let annotationsWrapper = document.getElementsByClassName(`annotationsWrapper${newAnnObj.book}`);
               let annotationsWrapperARR = [...annotationsWrapper]
               annotationsWrapperARR.forEach(page => page.parentElement.style.visibility = "hidden");
               
               alert(`You added new annotation.`)
          })
          .catch(err => console.log(err.message))

}

function annotationDeleteRequest(annObj) {
     fetch(`http://localhost:3000/api/annotations/${annObj.id}`, {
          method: "DELETE"
     })
          .then(res => {
               if (!res.ok) {
                    console.log(res.status);
                    return new Error("DELETE annotation error")
               }
               return res.json();
          })
          .then(data => {
               console.log(data);
               // let parentModal=document.getElementById(`modal${annObj.book}`);
               // parentModal.style.visibility="hidden";
               let annotationsWrapper = document.getElementsByClassName(`annotationsWrapper${annObj.book}`);
               let annotationsWrapperARR = [...annotationsWrapper]
               annotationsWrapperARR.forEach(page => page.parentElement.style.visibility = "hidden");
               alert(`You Deleted annotation with name - "${annObj.title}".`)
          })
          .catch(err => console.log(err.message))

}

function annotationEditRequest(oldAnnID, editedAnnObj) {
     fetch(`http://localhost:3000/api/annotations/${oldAnnID}`, {
          method: "PUT",
          headers: {
               'Content-Type': 'application/json',
          },
          body: JSON.stringify(editedAnnObj)
     })
          .then(res => {
               if (!res.ok) {
                    console.log(res.status);
                    return new Error("edit (PUT) annotation error")
               }
               return res.json();
          })
          .then(data => {
               console.log(data);
               // get 2 wrapper - favpage and home
               let annotationsWrapper = document.getElementsByClassName(`annotationsWrapper${editedAnnObj.book}`);
               let annotationsWrapperARR = [...annotationsWrapper]
               annotationsWrapperARR.forEach(page => page.parentElement.style.visibility = "hidden");
               alert(`You edited annotation with ID: ${data.id}`);
               // currModal.style.visibility = "hidden";
          })
          .catch(err => console.log(err.message))

}

