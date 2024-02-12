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

document.addEventListener('DOMContentLoaded', loadCheckboxStates);
document.addEventListener('DOMContentLoaded', dateFinished);