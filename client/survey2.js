function showOtherField() {
    var selectBox = document.getElementById('authenmethods');
    var otherField = document.getElementById('OtherField');
    if (selectBox.value === 'other') {
        otherField.style.display = 'block';
    } else {
        otherField.style.display = 'none';
    }
}

function showOtherPassword() {
    var selectBox = document.getElementById('passwordstorage');
    var otherField = document.getElementById('OtherPassword');
    if (selectBox.value === 'other') {
        otherField.style.display = 'block';
    } else {
        otherField.style.display = 'none';
    }
}

document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const pwordupdate = document.getElementById('pwordupdate').value;
    const authenmethods = document.getElementById('authenmethods').value;
    const otherAuth = document.getElementById('otherAuth').value;
    const passwordreuse = document.getElementById('passwordreuse').value;
    const easypwords = document.getElementById('easypwords').value;
    const uniqueimportance = document.getElementById('uniqueimportance').value;
    const thinkconsequences = document.getElementById('thinkconsequences').value;
    const passwordstorage = document.getElementById('passwordstorage').value;
    const otherpass = document.getElementById('otherpass').value;
    const forgotpassword = document.getElementById('forgotpassword').value;
    const personaldetails = document.getElementById('personaldetails').value;
    const passwordhint = document.getElementById('passwordhint').value;
    const autofill = document.getElementById('autofill').value;
    const similarpasswords = document.getElementById('similarpasswords').value;
    const passwordsharingmethod = document.getElementById('passwordsharingmethod').value;

    const secondsurveyData = {
        pwordupdate: pwordupdate,
        authenmethods: authenmethods === 'other' ? otherAuth : authenmethods,
        passwordreuse: passwordreuse,
        easypwords: easypwords,
        uniqueimportance: uniqueimportance,
        thinkconsequences: thinkconsequences,
        passwordstorage: passwordstorage === 'other' ? otherpass : passwordstorage,
        forgotpassword: forgotpassword,
        personaldetails: personaldetails,
        passwordhint: passwordhint,
        autofill: autofill,
        similarpasswords: similarpasswords,
        passwordsharingmethod: passwordsharingmethod === 'other' ? otherpass : passwordsharingmethod,
    };

    // Retrieve the first survey data from localStorage
    const firstsurveyData = JSON.parse(localStorage.getItem('firstsurveyData'));

    // Combine both survey data
    const combinedData = {
        ...firstsurveyData,
        ...secondsurveyData
    };

    // Send the combined data to the server once I receive the server I should put it within the parentheses
    fetch('submit-survey', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(combinedData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Thank you for completing the survey!');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
