// app.js

let addButton = document.querySelector('.addTextButton')
let toDoContainer = document.querySelector('.toDoContainer')
let inputField = document.querySelector('.inputField')
let para = document.querySelector('.paragraph-style')

// runs getToDos when page is loaded
document.addEventListener('DOMContentLoaded', getToDos)

// called in index.html
// toggles between light and dark mode
function toggleButton() {
    var element = document.body;
    element.classList.toggle("light-mode");
}


// event listener for addbutton that creates a new element as a paragraph every time the button is pushed
addButton.addEventListener('click', function () {
    var paragraph = document.createElement('p');

    paragraph.innerText = inputField.value; // inserts the input as the value for the paragraph
    paragraph.classList.add('paragraph-style') // adds the elemen to the paragraph-style class

    // append new element to container 
    toDoContainer.appendChild(paragraph);

    // add new element to session storage
    sessionList(inputField.value)

    // make input field blank after adding to container
    inputField.value = ' ';

})

// adds event listener to the ENTER button
inputField.addEventListener("keyup", function (e) {
    if (e.code === 'Enter') {
        addButton.click();
    }
})


// adds event listener to the container
// finds the index of the clicked on item and puts a line through it
toDoContainer.addEventListener("click", function (e) {
    var element = document.getElementsByClassName("paragraph-style")

    var target = e.target;
    var parent = target.parentNode;
    var index = [].indexOf.call(parent.children, target);

    element[index].style.textDecoration = "line-through";

});

//adds event listener to the container for double clicking (deleting)
toDoContainer.addEventListener("dblclick", function (e) {
    var element = document.getElementsByClassName("paragraph-style")

    var target = e.target;
    var parent = target.parentNode;
    var index = [].indexOf.call(parent.children, target);

    element[index].remove(); // removes element from screen

    removeToDos(index) // removes item from session storage

});


// adds todos to session storage
function sessionList(todo) {
    let todos;
    // if session storage is empty, create an array
    // if it isn't, add element to array

    if (sessionStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(sessionStorage.getItem("todos"))
    }
    todos.push(todo) // pushing item to array
    sessionStorage.setItem("todos", JSON.stringify(todos)) // setting key and value
}


// fetches todo list elements on reload
function getToDos(todo) {
    let todos;
    if (sessionStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(sessionStorage.getItem("todos"))
    }
    // loops through the list of session storage
    todos.forEach(function (todo) {
        var paragraph = document.createElement('p');

        paragraph.innerText = todo;
        paragraph.classList.add('paragraph-style')

        // append new element to container 
        toDoContainer.appendChild(paragraph);

    })

    sessionStorage.getItem("todos")

}

// removes todos from session storage
function removeToDos(index) {
    let todos;

    if (sessionStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(sessionStorage.getItem("todos"))
    }

    // splices todo at index and changes array to updated value
    todos.splice(index, 1)
    sessionStorage.setItem("todos", JSON.stringify(todos))

}
