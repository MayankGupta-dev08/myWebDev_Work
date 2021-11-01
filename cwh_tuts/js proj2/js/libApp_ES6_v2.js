console.log('Welcome to your own OurLibrary!');
console.log('using ES6_v2');

/* Todos"
1. Store all the data to the localStorage   --> Done
2. Give another column as an option to delete the book
3. Add a scroll bar to Our Books Section
4. Add search option to search in the page 
5. Add a badge for total number of books --> Done */

class Book {
    constructor(bName, bAuthor, bGenre, bFormat, bPubDate) {
        this.name = bName;
        this.author = bAuthor;
        this.genre = bGenre;
        this.format = bFormat;
        this.pubDate = bPubDate;
    }
}

class Display {
    add(book) {
        console.log("Added a new book to the library");
        let tableBody = document.getElementById('tableBody');
        let uiString = `<tr>
                            <td>${book.name}</td>
                            <td>${book.author}</td>
                            <td>${book.genre}</td>
                            <td>${book.format}</td>
                            <td>${book.pubDate}</td>
                        </tr>`;
        tableBody.innerHTML += uiString
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
        console.log("Reseted form for new enteries");
    }

    validate(book) {
        console.log("validating the new enteries");
        if (book.name.length < 3 || book.author.length < 4) {
            return false;
        } else {
            return true;
        }
    }

    showResponse(boldTxt, msg, msgColor, icon) {
        // console.log(msg);
        let messageBox = document.getElementById('message');
        let html = `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
                        <symbol id="check-circle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                        </symbol>
                        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </symbol>
                    </svg>
                    <div class="alert alert-${msgColor} alert-dismissible fade show" role="alert">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Info:"><use xlink:href="#${icon}"/></svg>
                        <strong>${boldTxt}:</strong> ${msg}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;
        messageBox.innerHTML = html;
        setTimeout(function () {
            messageBox.innerHTML = '';
        }, 5000);
    }

    showBooks(){
        console.log("We are ready to show our Books");
        let bookList = localStorage.getItem("books");
        let bookListObj;
        if(bookList == null){
            bookListObj = [];
        }else{
            bookListObj = JSON.parse(bookList);
        }

        let bookRows = "";
        bookListObj.forEach(function (element){
            bookRows += `<tr>
                            <td>${element.name}</td>
                            <td>${element.author}</td>
                            <td>${element.genre}</td>
                            <td>${element.format}</td>
                            <td>${element.pubDate}</td>
                        </tr>`;
        });

        
        let tableBody = document.getElementById('tableBody');
        if(bookListObj.length!=0){
            tableBody.innerHTML = bookRows;
            let bkCount = document.getElementById('bkCount');
            bkCount.innerText = `Total no. of Books: ${bookListObj.length}`;
        }else{
            // console.log("No books left to show!");
            let bkCount = document.getElementById('bkCount');
            bkCount.innerText = `Sorry, currently NO books in OurLibrary!`;
        }
    }
}

let dispObj1 = new Display();
dispObj1.showBooks();

// add an event listener to the element with id=addBtn for event 'click'
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener("submit", submitLibraryForm);

function submitLibraryForm(elem) {
    elem.preventDefault();  //to prevent the default action of submit event of button inside libraryForm
    console.log("You have added a book in Ourlibrary!");

    // getting the values which user have entered in libraryForm
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let pbDate = document.getElementById('pubdate').value;

    // let bkGenre = document.getElementById('bookGenre');
    // let genre = bkGenre.options[bkGenre.selectedIndex].value;
    let genre = document.getElementById('bookGenre').value;

    // let format = document.querySelector("input[name=bkformat]:checked").value;
    let format;
    let bkformat = document.getElementsByName('bkformat');
    for (let i = 0; i < bkformat.length; i++) {
        if (bkformat[i].checked)
            format = bkformat[i].value;
    }

    // creating a new object from Constructor function Book for the taken values from libraryForm
    let book = new Book(name, author, genre, format, pbDate);
    console.log(book);

    // showing the book in our UI, if it is a valid book
    let dispObj = new Display();
    if (dispObj.validate(book)) {
        dispObj.add(book);
        dispObj.clear();
        let msg = "You have successfully added a book in OurLibrary!"
        dispObj.showResponse('Success', msg, 'success', 'check-circle-fill');

        // adding the book in our local storage if it is a valid book 
        let bookList = localStorage.getItem("books");
        let bookListObj;
        if(bookList == null){
            bookListObj = [];
        }else{
            bookListObj = JSON.parse(bookList);
        }
        bookListObj.push(book);
        localStorage.setItem("books", JSON.stringify(bookListObj));
    } else {
        let msg = "We are sorry, but you can't add this in OurLibrary!"
        dispObj.showResponse('Failure', msg, 'danger', 'exclamation-triangle-fill');
    }

}