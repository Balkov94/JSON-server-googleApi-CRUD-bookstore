let search = document.getElementById("search");
let searchBy = document.getElementById("searchBy");
let searchBtn = document.getElementById("searchBtn");
let cardsContainer = document.getElementsByClassName("cards-container")[0];
let cardsContainerFav = document.getElementsByClassName("cards-container-fav")[0];
let loader = document.getElementsByClassName("loader-container")[0];
// pegination 
let resultNum = document.getElementById("resultNum");
let prevPage = document.getElementById("prevPage");
let nextPage = document.getElementById("nextPage");
let pageNum = document.getElementById("pageNum");
// add additional data to HTML element
//1 in HTML -> data-index="some value"
//2 in DOM get-> dataset.index => "some value"

prevPage.addEventListener("click", function () {
     if (!Number(pageNum.dataset.index)) {
          return;
     }
     pageNum.innerText = Number(pageNum.innerText) - 1;
     pageNum.dataset.index = Number(pageNum.dataset.index) - 10;
     fetchData();

})
nextPage.addEventListener("click", function () {
     pageNum.innerText = Number(pageNum.innerText) + 1;
     pageNum.dataset.index = Number(pageNum.dataset.index) + 10;
     fetchData();

})

searchBtn.addEventListener("click", function () {
     pageNum.innerText = 1;
     pageNum.dataset.index = 0;
     fetchData();
});


function addloader() {
     let loaderWrapper = document.createElement("div");
     loaderWrapper.className = "loader-container";
     let loader = document.createElement("div");
     loader.className = "loader";
     loaderWrapper.append(loader);
     return loaderWrapper;
}

search.addEventListener("click", () => {
     search.value = "";
})



function fetchData() {
     let inputText = search.value;
     let qParam = `in${searchBy.value}`; //title / author / publisher
     // 1. Fetch url validation !!!! CARE with SPACE char
     if (typeof inputText == 'undefined' || inputText.length < 3) {
          alert(`You have to enter min 3 chars to search!`);
          return;
     }
     // 2. clear wrapper and add loading animation
     cardsContainer.innerHTML = "";
     let loader = addloader();
     cardsContainer.append(loader);


     //* fix searching title need "" because of ENCODING SPACE 
     if (qParam == "intitle") {
          inputText = `\"${inputText}\"`;
     }
     else if (inputText.includes(" ")) {
          inputText = inputText.replaceAll(" ", "-")
     }

     // 3 fetch data
     fetch(`https://www.googleapis.com/books/v1/volumes?q=${qParam}:${inputText}&printType=books&startIndex=${pageNum.dataset.index}&maxResults=10`)
          .then(res => res.json())
          .then(data => {
               console.log(data);
               // print total result
               resultNum.innerText = `${data.kind.slice(6)} ${data.totalItems}`;
               if (data.totalItems == 0) {
                    ErrorPage();
                    return;
               }
               // add curr card
               for (let i = 0; i < data.items.length; i++) {
                    let currBook = data.items[i];
                    createAppendCard(currBook, cardsContainer);


               }
          })
          .then(() => {
               // clear loading animation
               loader.remove();
          })
          .then(() => {
               // on each page - diabled already added to fav Cards buttons
               checkCardButton();
          })


     // error div -> book not found
     function ErrorPage() {
          let notfound = document.createElement("div");
          notfound.className = "notFound";
          notfound.innerText = `Sorry, there isn't any valume with 
          "${inputText.replaceAll("\"", " ").trim()}" ${searchBy.value}`;
          cardsContainer.append(notfound);
     }
}

function createAppendCard(currBook, page) {
     let title = currBook.volumeInfo.title;
     let authors = currBook.volumeInfo.authors;
     let bookID = currBook.id;
     if (Array.isArray(authors)) {
          authors = authors.join(", ");
     }
     else if (authors == 'undefined') {
          authors = "no infromation";
     }

     let description = currBook.volumeInfo.description;
     let year = currBook.volumeInfo.publishedDate;
     let bookImgSrc = currBook.volumeInfo.imageLinks;
     if (!bookImgSrc) {
          bookImgSrc = "https://storiavoce.com/wp-content/plugins/lightbox/images/No-image-found.jpg";
     }
     else {
          bookImgSrc = currBook.volumeInfo.imageLinks["thumbnail"];
     }

     let src = bookImgSrc ? bookImgSrc : "none";

     let cardContainer = document.createElement("div");
     cardContainer.className = "card";
     cardContainer.id = "cardContainer" + bookID;

     let cardImg = document.createElement("img");
     cardImg.src = src;
     cardImg.className = "card-img";
     cardImg.id = "img" + bookID;

     let cardBodyDesc = document.createElement("div");
     cardBodyDesc.className = "card-title-desc";

     let cardTitle = document.createElement("h5");
     cardTitle.className = "card-title";
     cardTitle.innerText = title;
     cardTitle.id = "title" + bookID;


     let cardText = document.createElement("p");
     cardText.className = "card-text";
     cardText.innerText = description ? description : "no description";
     cardText.id = "description" + bookID;

     cardBodyDesc.append(cardTitle, cardText);

     let cardUl = document.createElement("ul");
     cardUl.className = "card-author-year";
     let cardYear = document.createElement("li");
     debugger; 
     // nedd check for with page are the cards
     if(page.className=="cards-container-fav"){
          cardYear.innerText = ("year: " + (year ? year.slice(5).trim() : "-"));
     }
     else{
          cardYear.innerText = ("year: " + (year ? year.slice(0,4).trim() : "-"));
     }

     cardYear.id = "year" + bookID;
     let cardAuthor = document.createElement("li");
     cardAuthor.innerText = "author: " + (authors ? authors.trim() : "-");
     cardAuthor.id = "author" + bookID;
     cardUl.append(cardAuthor, cardYear);

     let cardButtonsContainer = document.createElement("div");
     cardButtonsContainer.className = "card-buttons";
     let cardButton = document.createElement("button");

     // if (page.className == "cards-container") {
     // check if book is already in favourites
     // REMOVE button in fav page
     if (page.className =="cards-container-fav") {
          cardButton.className = "cardRemoveBtn";
          cardButton.innerText = "Remove";
          cardButton.id = "removeButton" + bookID;
          cardButton.addEventListener("click",function(){
               deleteRequest(`${bookID}`);
               let parent = document.getElementById(`cardContainer${(bookID)}`);
               parent.remove();
          })

     }
     // add to fav button in home page
     else {
          cardButton.className = "cardFavBtn";
          cardButton.innerText = "add to Fav";
          cardButton.id = "favButton" + bookID;

          cardButton.addEventListener("click",function(){
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

     cardButtonsContainer.append(cardButton);

     // add annotations button - > toggle for modal with annotations
     let annotationContainer = document.createElement("div");
     annotationContainer.className = "annotation-container";
     let annotationBtn = document.createElement("button");
     annotationBtn.innerText = "annotations";
     annotationBtn.className = "annotation-btn";
     annotationBtn.id = "annButton" + bookID; // a + id , because some id's start with number
     annotationContainer.append(annotationBtn);


     // 0 add modal container for showing annotations
     let modalContainer = document.createElement("div");
     modalContainer.className = "modal";
     modalContainer.id = "modal" + bookID;
     modalContainer.style.visibility = "hidden";

     // add new annotation btn
     let addAnnBtnContainer = document.createElement("div");
     addAnnBtnContainer.className = "add-ann-btn-container";
     let addNewAnnotationBtn = document.createElement("button");
     addNewAnnotationBtn.innerText = "add new annotation";
     addNewAnnotationBtn.className = "addAnnBtn";
     addNewAnnotationBtn.id = `addAnnotation${bookID}`;
     addAnnBtnContainer.append(addNewAnnotationBtn);

     // add toggle function to ann button - test fix
     annotationBtn.addEventListener("click", function () {
          if (modalContainer.style.visibility == "hidden") {
               modalContainer.style.visibility = "visible";
               annotationsWrapper.innerHTML = "";
               annotationGetRequest(bookID);
          }
          else {
               modalContainer.style.visibility = "hidden";
          }
     })
     // add function to "ADD NEW ANNOTATION" button
     addNewAnnotationBtn.addEventListener("click", function () {
          createNewAnnotation(bookID);
     })


     // adding 1- "add annutations wrapper"
     let annotationsWrapper = document.createElement("div");
     annotationsWrapper.className = "modal-content-wrapper";
     annotationsWrapper.id = `annotationsWrapper${bookID}`;
     // second classlist just for itarating in printing annotations
     annotationsWrapper.classList.add(`annotationsWrapper${bookID}`)

     modalContainer.append(addAnnBtnContainer, annotationsWrapper);



     cardContainer.append(cardImg, cardBodyDesc, cardUl, cardButtonsContainer, annotationContainer, modalContainer)

     page.append(cardContainer)


}






