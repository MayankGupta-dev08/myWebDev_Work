console.log("Welcome to Magic Notes App, this is app.js");
showNotes();

// If user adds a note, we will add it to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");  //returns current value stored in local storage with the given key, and null if key doesn't exist
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse("notes"); //convert string into a json obj
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));    //json obj into string
    addTxt.value = "";

    showNotes();
});

// Function to show elements from the local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse("notes");
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                 <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                     <div class="card-body">
                         <h5 class="card-title">Note ${index+1}</h5>
                         <p class="card-text">${element}</p>
                         <button href="#" class="btn btn-primary">Delete Note</button>
                     </div>
                 </div>`;
    });
    let notesElm = document.getElementById("notes");
    if(notesObj.length != 0){
        notesElm.innerHTML = html;
    }else{
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}