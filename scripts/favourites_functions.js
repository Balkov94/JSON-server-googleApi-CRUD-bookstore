// favourites page functions____________________________________________

let favLink = document.getElementById("favourites-link");
let favPage = document.getElementsByClassName("cards-container-fav")[0];

favLink.addEventListener("click", function () {
     getRequest(); //JSON server get all fav Books

})

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
          return;
     }

}

function closeAllModalsinPageSwitch() {

     let allModalsCollection = document.getElementsByClassName("modal");
     let allModalsArr = [...allModalsCollection];
     allModalsArr.forEach(modal => modal.style.visibility = "hidden");
}

