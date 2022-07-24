// favourites page functions____________________________________________

let favLink = document.getElementById("favourites-link");
let favPage = document.getElementsByClassName("cards-container-fav")[0];

favLink.addEventListener("click", function () {
     getRequest(); //JSON server get all fav Books

})


// !!! Bot function  "removeButtonAddListener" and "favButtonAddListener()" are DEPRECATED
// get all remove button from card book + add them remove function
function removeButtonAddListener() {
     let cardRemoveButton = document.getElementsByClassName("cardRemoveBtn"); // html collection
     let cardRemoveButtonArr = [...cardRemoveButton];
     cardRemoveButtonArr.forEach(button => {
          button.addEventListener("click", function () {
               deleteRequest(`${(button.id).replace("removeButton", "")}`);
               let parent = document.getElementById(`cardContainer${(button.id).replace("removeButton", "")}`);
               parent.remove();
          })

     });
}


async function favButtonAddListener() {
     let allFavBtns = document.getElementsByClassName("cardFavBtn");
     let data = await fetch(`http://localhost:3000/api/favourites/`);
     let allBooks = await data.json();
     let allFavBooks = allBooks;
     console.log("all fav books: " + allFavBooks);

     for (let i = 0; i < allFavBtns.length; i++) {
          //!FIX -> have to check is the curr button/card/book in favourite page
          let bookID = (allFavBtns[i].id).replace("favButton", "");

          if (allFavBooks.some(book => book.id == bookID)) {
               allFavBtns[i].innerText = "Remove from Fav"
               allFavBtns[i].addEventListener("click", removeFromFavHandler)


          }
          else {
               allFavBtns[i].innerText = "Add to Fav";
               allFavBtns[i].addEventListener("click", addToFavHandler)

          }
          function addToFavHandler() {
               // extract new book object from clicked button
               // all data has id= > nameField + bookID
               // debugger;
               allFavBtns[i].innerText = "Remove from Fav";
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
               allFavBtns[i].addEventListener("click", removeFromFavHandler);
               allFavBtns[i].removeEventListener("click", addToFavHandler);
          }

          function removeFromFavHandler() {
               deleteRequest(`${bookID}`);
               allFavBtns[i].innerText = "Add to Fav";
               allFavBtns[i].addEventListener("click", addToFavHandler)
               allFavBtns[i].removeEventListener("click", removeFromFavHandler);
          }
     }
}

async function checkCardButton() {
     let allFavBtns = document.getElementsByClassName("cardFavBtn");
     try {
          let data = await fetch(`http://localhost:3000/api/favourites/`);
          let allFavBooks = await data.json();

          for (let i = 0; i < allFavBtns.length; i++) {
               let currBtnID = (allFavBtns[i].id).replace("favButton", "");

               if (allFavBooks.find(book => book.id == currBtnID)) {
                    allFavBtns[i].disabled = true;
               }
               else {
                    allFavBtns[i].disabled = false;
               }
          }
     } catch (error) {
          // // console.error(error);
          // let favPage = document.getElementsByClassName("cards-container-fav")[0];
          // favPage.innerHTML = "";
          // let emptyContainer = document.createElement("div");
          // emptyContainer.className = "fav-empty-container";
          // let text = document.createElement("h1");
          // text.innerText = "Favourites page is empty";
          // emptyContainer.append(text);
          // favPage.append(emptyContainer);
          return;
     }

}

function closeAllModalsinPageSwitch() {

     let allModalsCollection = document.getElementsByClassName("modal");
     let allModalsArr = [...allModalsCollection];
     allModalsArr.forEach(modal => modal.style.visibility = "hidden");
}

