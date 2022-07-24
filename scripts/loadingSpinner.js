
// loader spinner functions

function addloader() {
     let loaderWrapper = document.createElement("div");
     loaderWrapper.className = "loader-container";
     let loader = document.createElement("div");
     loader.className = "loader";
     loaderWrapper.append(loader);
     return loaderWrapper;
     // retun loading element
}