// app.js

let addButton = document.querySelector('.addTextButton')
let toDoContainer = document.querySelector('.toDoContainer')
let inputField = document.querySelector('.inputField')

function toggleButton() {
    var element = document.body;
    element.classList.toggle("light-mode");
}

// creates new element as paragraph when button is pushed
addButton.addEventListener('click', function () {
    var paragraph = document.createElement('p');
    paragraph.innerText = inputField.value;
    paragraph.classList.add('paragraph-style')
    // append new element to container 
    toDoContainer.appendChild(paragraph);
    inputField.value = ' ';

    paragraph.addEventListener('click', function () {
        paragraph.style.textDecoration = "line-through";
        toDoContainer.removeChild(toDoContainer)
    })

    paragraph.addEventListener('dblclick', function () {
        toDoContainer.removeChild(paragraph)
    })
})

inputField.addEventListener("keyup", function (e) {
    if (e.code === 'Enter') {
        addButton.click();
    }
});

