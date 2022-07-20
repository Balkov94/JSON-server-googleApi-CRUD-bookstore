

// * hash ruter
let wrapper = document.getElementById("wrapper");
let searchContainer = document.getElementById("search-container");
let favDiv = document.getElementById("favourites");
window.addEventListener("hashchange", hashChangeHandler);
window.addEventListener("load", hashChangeHandler);


function hashChangeHandler() {
     let hash = location.hash.slice(1);
     // debugger;
     switch (hash) {
          case "Home":
               wrapper.style.display = "flex";
               searchContainer.style.display = "block"
               favDiv.style.display = "none";
               break;
          case "Favourites":
               favDiv.style.display = "flex";
               wrapper.style.display = "none";
               searchContainer.style.display = "none"
               break;
          case "":
               wrapper.style.display = "flex";
               searchContainer.style.display = "block"
               favDiv.style.display = "none";
               break;

     }
}


