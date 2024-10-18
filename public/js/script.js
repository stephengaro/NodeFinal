
// Author: Stephen Garo
// Date: 2024-10-18
// Course Module: Web Application Development (CPRG-210-A)
// Assignment: Node Final Assignment


// Script for validation and error messages
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    clearErrorMessages();

    const formData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        city: document.getElementById("city").value.trim(),
        province: document.getElementById("province").value.trim(),
        postal: document.getElementById("postal").value.trim(),
        feedback: document.getElementById("feedback").value.trim()
    };

    // Validate the form
    if (validateForm(formData)) {
        // If valid, submit the form
        this.submit();
    }
});


// function to clear error messages
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error');
    errorMessages.forEach(msg => msg.style.display = 'none');
}

// function to validate the form fields
function validateForm(data) {
    let isValid = true;

    const firstNamePattern = /^[a-zA-Z]{2,25}$/;
    if (data.city === "" || !firstNamePattern.test(data.firstName)) {
        displayError("firstDesc");
        isValid = false;
    }

    const lastNamePattern = /^[a-zA-Z]{2,25}$/;
    if (data.city === "" || !lastNamePattern.test(data.lastName)) {
        displayError("lastDesc");
        isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (data.email === "" || !emailPattern.test(data.email)) {
        displayError("emailDesc");
        isValid = false;
    }

    const phonePattern = /^\d{1}-\d{3}-\d{3}-\d{4}$/;
    if (data.phone === "" || !phonePattern.test(data.phone)) {
        displayError("phoneDesc");
        isValid = false;
    }

    const cityPattern = /^[a-zA-Z\s]{2,50}$/;
    if (data.city === "" || !cityPattern.test(data.city)) {
        displayError("cityDesc");
        isValid = false;
    }

    const provincePattern = /^[a-zA-Z]{2,25}$/;
    if (data.city === "" || !provincePattern.test(data.province)) {
        displayError("provinceDesc");
        isValid = false;
    }

    const postalPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (data.postal === "" || !postalPattern.test(data.postal)) {
        displayError("postalDesc");
        isValid = false;
    }

    if (data.feedback === ""|| data.feedback.length > 140) {
        displayError("feedbackDesc");
        isValid = false;
    }

    return isValid; 
}

// this displays error messages
function displayError(elementId) {
    document.getElementById(elementId).style.display = 'block';
}

// this function hides all the description in the array right away and runs a loop checking to see if its exceptDesc
function hideAllDescriptionsExcept(exceptDesc) {
    const descriptions = [
        firstDesc, lastDesc, emailDesc, phoneDesc,
        cityDesc, provinceDesc, postalDesc, feedbackDesc
    ];
    descriptions.forEach(desc => {
        if (desc !== exceptDesc) {
            desc.style.display = 'none';
        }
    });
}

// Selects input field and description, when input is selected its shows description related to it using onfocus and displays inline but hides all other descriptions
const firstInput = document.getElementById("firstName");
const firstDesc = document.getElementById("firstDesc");
firstInput.onfocus = () => {
    firstDesc.style.display = 'inline';
    hideAllDescriptionsExcept(firstDesc);
};

const lastInput = document.getElementById("lastName");
const lastDesc = document.getElementById("lastDesc");
lastInput.onfocus = () => {
    lastDesc.style.display = 'inline';
    hideAllDescriptionsExcept(lastDesc);
};

const emailInput = document.getElementById("email");
const emailDesc = document.getElementById("emailDesc");
emailInput.onfocus = () => {
    emailDesc.style.display = 'inline';
    hideAllDescriptionsExcept(emailDesc);
};

const phoneInput = document.getElementById("phone");
const phoneDesc = document.getElementById("phoneDesc");
phoneInput.onfocus = () => {
    phoneDesc.style.display = 'inline';
    hideAllDescriptionsExcept(phoneDesc);
};

const cityInput = document.getElementById("city");
const cityDesc = document.getElementById("cityDesc");
cityInput.onfocus = () => {
    cityDesc.style.display = 'inline';
    hideAllDescriptionsExcept(cityDesc);
};

const provinceInput = document.getElementById("province");
const provinceDesc = document.getElementById("provinceDesc");
provinceInput.onfocus = () => {
    provinceDesc.style.display = 'inline';
    hideAllDescriptionsExcept(provinceDesc);
};

const postalInput = document.getElementById("postal");
const postalDesc = document.getElementById("postalDesc");
postalInput.onfocus = () => {
    postalDesc.style.display = 'inline';
    hideAllDescriptionsExcept(postalDesc);
};

const feedbackInput = document.getElementById("feedback");
const feedbackDesc = document.getElementById("feedbackDesc");
feedbackInput.onfocus = () => {
    feedbackDesc.style.display = 'inline';
    hideAllDescriptionsExcept(feedbackDesc);
};
