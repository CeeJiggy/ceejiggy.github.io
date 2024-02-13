const dates = document.querySelectorAll('p');
const events = document.querySelectorAll('li');

const datesArray = Array.from(dates);

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
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        if (checkbox.nextElementSibling != null) {
            if (checkbox.nextElementSibling.localName === 'strong') {
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
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
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
document.addEventListener('DOMContentLoaded', dateFinished);