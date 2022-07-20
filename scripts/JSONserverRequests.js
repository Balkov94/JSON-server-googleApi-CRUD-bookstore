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
     fetch(`http://localhost:3000/api/posts/14`, {
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
          })
          .catch(err => console.log(err.message))




})

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

function deleteRequest(bookID){
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
