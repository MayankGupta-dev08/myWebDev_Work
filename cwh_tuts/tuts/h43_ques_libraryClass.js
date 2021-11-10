/* Create a library class and implement the following things:
    1. Constructor -> takes book lists as arguments
    2. getBookList() -> returns bookList
    3. issueBook(bookName, user)
    4. returnBook(bookName, user)     */

class Library {
    constructor(bookList) {
        this.bookList = bookList;
        this.issuedBooks = {};
    }

    getBookList() {
        this.bookList.forEach(element => {
            console.log(element);
        });
    }

    getIssuedBookList() {
        console.log("Issued book list");
        for (const key in this.issuedBooks) {
            console.log(`${key} : ${this.issuedBooks[key]}`);
        }
    }

    issueBook(bookName, user) {
        if (this.issuedBooks[bookName] == undefined) {
            this.issuedBooks[bookName] = user;
            console.log(`${bookName} is issued to ${user}.`);
        } else {
            console.log("This book is already issued!, try something different.");
        }
    }

    returnBook(bookName, user) {
        delete this.issuedBooks[bookName];
        console.log(`${bookName} is returned by ${user}.`);
    }
}

let mannuLib = new Library(["Book1", "Book2", "Book3", "Book4"]);
mannuLib.getBookList();

mannuLib.issueBook("Book1", "puru");
mannuLib.issueBook("Book2", "mannu");
mannuLib.issueBook("Book3", "pulkit");
mannuLib.issueBook("Book2", "mannu");
mannuLib.issueBook("Book4", "mannu");

mannuLib.getIssuedBookList();

mannuLib.returnBook("Book1", "puru");

mannuLib.getIssuedBookList();