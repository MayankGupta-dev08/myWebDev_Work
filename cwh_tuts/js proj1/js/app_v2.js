console.log("Welcome to Magic Notes App, this is app.js");
showNotes();

// constantly changing the time after every 1000msec or 1sec
setInterval(upDateTime, 1000);
function upDateTime() {
    let timeNow = document.getElementById('timeNow');
    timeNow.innerHTML = new Date();
}


// If user adds a note, we will add it to local storage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    let addTxt = document.getElementById("addTxt");
    let addTtl = document.getElementById("addTtl");
    let currTime = new Date();
    let tme = currTime.toDateString() + ", " + currTime.toLocaleTimeString();

    let notes = localStorage.getItem("notes");  //returns current value stored in local storage with the given key, and null if key doesn't exist
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); //convert string into a json obj
    }

    let myObj = {
        title: addTtl.value,
        text: addTxt.value,
        time: tme
    };
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));    //json obj into string
    addTtl.value = "";
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
});

// Function to show elements from the local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h6 class="card-no">Note${index + 1} @ ${element.time}</h6><hr>
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button>
                            <button type="button" class="btn btn-success">Important</button>
                        </div>
                   </div>
                </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// function for searching from navbar in the webpage
let search = document.getElementById('searchTxt');
search.addEventListener('input', function () {

    let srchInput = search.value.toLowerCase();
    // console.log('Input event fired!', srchInput);

    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(srchInput)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

/*
Further Features:
1. Add Title -> Done
2. Mark a note as Important
3. Adding time stamps to the notes -> Done
4. Separate notes by user
5. Sync and host to web server
*/