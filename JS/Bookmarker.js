var BookName = document.getElementById("BookName");
var BookSite = document.getElementById("BookSite");
var btnSubmit = document.getElementById("submitData");
var btnClear = document.getElementById("clearData");
var btnClearItems = document.getElementById("DeleteItems");
var validateMess = document.getElementById("ValidateMess");
var btnClose = document.getElementById("CloseValid");
btnSubmit.addEventListener('click', AddToLibrary);
btnClearItems.addEventListener('click', ClearItems);
BookName.addEventListener('keyup', NameType);
BookSite.addEventListener('keyup', SiteType);
btnClose.addEventListener('click', CloseValid);
var BooksList = [];
if (localStorage.getItem('BooksList') != null) {
    BooksList = JSON.parse(localStorage.getItem("BooksList"));
    display();
}
if (BooksList.length != 0) {
    btnClear.classList.replace("d-none", "d-block");
}
function Search(value) {
    var BookINFO2 = "";
    for (var i = 0; i < BooksList.length; i++) {
        if (BooksList[i].Name.toLowerCase().includes(value.toLowerCase())) {
            BookINFO2 += `
            <tr>
            <td>${i + 1}</td>
            <td>${BooksList[i].Name.replaceAll(value, `<span style="background-color: yellow;color:black;">${value}</span>`)}</td>
            <td><a class="text-decoration-none px-3 btn btn-outline-success " href="${BooksList[i].Site}" target="_blank"><i
                        class="fa-solid fa-eye pe-2"></i> Visit</a></td>
            <td><button onclick="deleteItem(${i})" class="btn btn-outline-danger bx-2"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
            `
        }
    }
    document.getElementById("tbodyID").innerHTML = BookINFO2;
}
function NameType() {
    if (BookName.value == "") {
        resetValid();
    }
    if (BookName.value == "") {
        resetInValid();
    }
    if (validateName(BookName.value) == false) {
        BookName.classList.add("is-invalid");
        if (BookName.value == "") {
            resetInValid();
        }
        return false;
    } else {
        if (BookName.value == "") {
            resetValid();
        }
        if (BookName.classList.replace("is-invalid", "is-valid") == false) {
            if (BookName.value == "") {
                resetValid();
            }
            BookName.classList.add("is-invalid");
            BookName.classList.replace("is-invalid", "is-valid");
            return true;
        } else {
            BookName.classList.replace("is-invalid", "is-valid");
            if (BookName.value == "") {
                resetValid();
            }
            return true;
        }
    }
}
function SiteType() {
    if (BookSite.value == "") {
        resetInValid();
    }
    if (BookSite.value == "") {
        resetValid();
    }
    if (validateLink(BookSite.value) == false) {
        BookSite.classList.add("is-invalid");
        if (BookSite.value == "") {
            resetInValid();
        }
        return false;
    } else {
        if (BookSite.value == "") {
            resetValid();
        }
        if (BookSite.classList.replace("is-invalid", "is-valid") == false) {
            if (BookSite.value == "") {
                resetValid();
            }
            BookSite.classList.add("is-invalid");
            BookSite.classList.replace("is-invalid", "is-valid");
            return true;
        } else {
            BookSite.classList.replace("is-invalid", "is-valid");
            if (BookSite.value == "") {
                resetValid();
            }
            return true;
        }
    }
}
function AddToLibrary() {
    Book = {
        Name: BookName.value,
        Site: BookSite.value,
    }
    if (NameType() && SiteType) {
        BooksList.unshift(Book);
        if (BooksList.length != 0) {
            btnClear.classList.replace("d-none", "d-block");
        }
        localStorage.setItem("BooksList", JSON.stringify(BooksList))
        display();
        resetValue();
        resetValid();
    } else {
        validateMess.classList.replace("d-none", "d-flex");
    }
}
function resetValid() {
    BookName.classList.remove("is-valid");
    BookSite.classList.remove("is-valid")
}
function resetInValid() {
    BookName.classList.remove("is-invalid");
    BookSite.classList.remove("is-invalid")
}
function CloseValid() {
    validateMess.classList.replace("d-flex", "d-none");
}
function validateName(Book) {
    var regexName = /^[a-z][a-z|0-9|\s]{2,10}$/;
    if (regexName.test(Book)) {
        return true;

    }
    return false;

}
function validateLink(value) {
    if (value == "") {
        return false;
    }
    var regexURL = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    if (regexURL.test(value)) {
        return true;
    } else {
        return false;
    }
}
function ClearItems() {
    BooksList.splice(0);
    localStorage.clear();
    display();
    btnClear.classList.replace("d-block", "d-none");
}
function display() {
    var BookINFO = "";
    for (var i = 0; i < BooksList.length; i++) {
        BookINFO += `
        <tr>
        <td>${i + 1}</td>
        <td>${BooksList[i].Name}</td>
        <td><a class="text-decoration-none px-3 btn btn-outline-success " href="${BooksList[i].Site}" target="_blank"><i
                    class="fa-solid fa-eye pe-2"></i> Visit</a></td>
        <td><button onclick="deleteItem(${i})" class="btn btn-outline-danger bx-2"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
    </tr>
        `
    }
    document.getElementById("tbodyID").innerHTML = BookINFO;
}
function deleteItem(index) {
    BooksList.splice(index, 1);
    localStorage.setItem("BooksList", JSON.stringify(BooksList));
    display();
    if (BooksList.length == 0) {
        btnClear.classList.replace("d-block", "d-none")
    }
}
function resetValue() {
    BookName.value = '';
    BookSite.value = '';
}
