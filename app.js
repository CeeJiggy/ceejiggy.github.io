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
    for (let i = 0; i < checkboxes.length; i++) {
        let currentCheck = checkboxes[i];
        if (currentCheck.checked) {
            currentCheck.parentNode.style.backgroundColor = 'black';
            currentCheck.parentNode.nextElementSibling.style.visibility = 'hidden';
            currentCheck.parentNode.nextElementSibling.style.height = '0px';
            currentCheck.parentNode.classList.remove('currentDate');
            if (!checkboxes[i + 1].checked) {
                let newCurrentDate = checkboxes[i + 1];
                for (let j = 0; j < checkboxes.length; j++) {
                    if (checkboxes[j] === currentCheck) {
                        continue;
                    }
                    if (checkboxes[j].checked) {
                        checkboxes[j].parentNode.style.backgroundColor = 'black';
                    }
                    else {
                        checkboxes[j].parentNode.style.backgroundColor = 'rgb(0, 127, 201)';
                    }
                    checkboxes[j].parentNode.classList.remove('currentDate');


                }
                checkboxes[i + 1].parentNode.classList.add('currentDate');
            }
            else {
                checkboxes[i + 1].parentNode.classList.remove('currentDate');
            }
        }

        else {
            if (i < checkboxes.length - 1) {
                if (!checkboxes[i + 1].checked) {
                    checkboxes[i + 1].parentNode.classList.remove('currentDate');
                }
            }
            if (checkboxes[i].parentNode.classList.contains('currentDate')) {
                checkboxes[i].parentNode.style.backgroundColor = 'rgb(121 235 255)';
            }
            else {
                checkboxes[i].parentNode.style.backgroundColor = 'rgb(0, 127, 201)';
            }

            currentCheck.parentNode.nextElementSibling.style.visibility = 'visible';
            currentCheck.parentNode.nextElementSibling.style.height = 'auto';

        }
    }
    setDefaultCurrentDate();
}

function setDefaultCurrentDate() {
    let dateCheck = document.querySelectorAll('.currentDate');
    if (dateCheck.length === 0) {
        datesArray[0].parentNode.classList.add('currentDate');
        datesArray[0].parentNode.style.backgroundColor = 'rgb(121 235 255)';
    }
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
    setDefaultCurrentDate();
    dateFinished();
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

const scrollIntoViewWithOffset = (selector, offset) => {
    window.scrollTo({
        behavior: 'smooth',
        top:
            selector.getBoundingClientRect().top -
            document.body.getBoundingClientRect().top -
            offset,
    })
}

function scrollToCurrentDate() {
    let currentDate = document.querySelector('.currentDate');
    if (currentDate !== null) {
        if (currentDate !== datesArray[0].parentNode) {
            scrollIntoViewWithOffset(currentDate, 10)
        }
    }
}

function reset() {
    let toReset = confirm("You are about to reset the guide. Would you like to proceed?");
    if (toReset) {
        let toResetConfirm = confirm("Are you sure?");
        if (toResetConfirm) {
            const checkboxes = Array.from(document.querySelectorAll('input'));
            for (let i = 0; i < checkboxes.length; i++) {
                let currentCheck = checkboxes[i];
                if (currentCheck.checked) {
                    currentCheck.checked = false;
                    dateFinished();
                    saveCheckboxStates();
                }
            }
            let finished = alert("The guide has been reset.");
        }
    }

}

function loadScreen() {

    JsLoadingOverlay.show({
        'overlayBackgroundColor': 'rgb(43,43,43)',
        'overlayOpacity': 1,
        'spinnerIcon': 'ball-clip-rotate',
        'spinnerColor': '#00c5ff',
        'spinnerSize': '2x',
        'overlayIDName': 'overlay',
        'spinnerIDName': 'spinner',
        'spinnerZIndex': 99999,
        'overlayZIndex': 99998,
        'lockScroll': true
    })
    document.querySelector('.contents').style.display = 'block';
    const loadTimer = setTimeout(hideLoad, 10);
}

function hideLoad() {
    JsLoadingOverlay.hide();
    scrollToCurrentDate();
}

document.addEventListener('mousedown', function (event) {
    if (event.detail > 1) {
        event.preventDefault();
    }
}, false);



document.addEventListener('DOMContentLoaded', loadScreen);
document.addEventListener('DOMContentLoaded', loadCheckboxStates);
document.addEventListener('DOMContentLoaded', buildDatesArray);
document.addEventListener('DOMContentLoaded', scrollFunction);







