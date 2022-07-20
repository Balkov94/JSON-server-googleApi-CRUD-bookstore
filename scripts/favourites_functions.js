let favLink = document.getElementById("favourites-link");
let favPage = document.getElementsByClassName("cards-container-fav")[0];

favLink.addEventListener("click", function () {
     favPage.innerHTML = "";
     getRequest();

})

function removeButtonAddListener() {
     let cardRemoveButton = document.getElementsByClassName("cardRemoveBtn"); //html collection
     let cardRemoveButtonArr = [...cardRemoveButton];
     cardRemoveButtonArr.forEach(button => {
          button.addEventListener("click", function () {
               deleteRequest(`${(button.id).replace("removeButton", "")}`);
          })

     });
}


function favButtonAddListener() {
     let allFavBtns = document.getElementsByClassName("cardFavBtn");

     for (let i = 0; i < allFavBtns.length; i++) {
          let bookID = (allFavBtns[i].id).replace("favButton", "");
          allFavBtns[i].addEventListener("click", function () {
               // extract new book object from clicked button
               // all data has id= > nameField + bookID
               let bookObjID = bookID;
               let title = document.getElementById(`title${bookID}`).innerText;
               let imageSrc = document.getElementById(`img${bookID}`).src;
               let description = document.getElementById(`description${bookID}`).innerText;
               let authors = document.getElementById(`author${bookID}`).innerText;
               let publishedDate = document.getElementById(`year${bookID}`).innerText;

               let bookObj = {
                    id: bookObjID,
                    volumeInfo: {
                         title,
                         imageLinks: {
                              thumbnail: imageSrc,
                         },
                         description,
                         authors,
                         publishedDate
                    }
               }
               postRequest(bookObj);

          })
     }
}