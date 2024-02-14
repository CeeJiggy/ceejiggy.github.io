const events = document.querySelectorAll('li');
const labels = document.querySelectorAll('label');

const datesArray = [];
const collapsables = [];
const labelArray = Array.from(labels);



const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', saveCheckboxStates);
    checkbox.addEventListener('change', dateFinished);
});

function saveCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        localStorage.setItem(checkbox.id, checkbox.checked);
    });
}

function dateFinished() {
    const checkboxes = datesArray;
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            checkbox.parentNode.style.backgroundColor = 'black';
            checkbox.parentNode.nextElementSibling.style.visibility = 'hidden';
            checkbox.parentNode.nextElementSibling.style.height = '0px';
        }
        else {
            checkbox.parentNode.style.backgroundColor = 'rgb(0, 84, 209)';
            checkbox.parentNode.nextElementSibling.style.visibility = 'visible';
            checkbox.parentNode.nextElementSibling.style.height = 'auto';
        }
    })
}


function buildDatesArray() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        if (checkbox.nextElementSibling !== null) {
            if (checkbox.nextElementSibling.childNodes[0] !== null) {
                if (checkbox.nextElementSibling.childNodes[0] !== undefined) {
                    if (checkbox.nextElementSibling.childNodes[0].localName === 'strong') {
                        datesArray.push(checkbox);
                        collapsables.push(checkbox.parentNode.nextElementSibling);

                    }
                }
            }
        }
    })
}


function loadCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        const savedState = localStorage.getItem(checkbox.id);
        if (savedState !== null) {
            checkbox.checked = savedState === 'true';
        }
    });
}

//Get the button
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    if (
        document.body.scrollTop > 200 ||
        document.documentElement.scrollTop > 200
    ) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

document.addEventListener('DOMContentLoaded', loadCheckboxStates);
document.addEventListener('DOMContentLoaded', buildDatesArray);
document.addEventListener('DOMContentLoaded', dateFinished);


