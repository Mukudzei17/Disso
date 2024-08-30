function showOtherField() {
    var selectBox = document.getElementById('authenmethods');
    var otherField = document.getElementById('OtherField');
    if (selectBox.value === 'other') {
        otherField.style.display = 'block';
    } else {
        otherField.style.display = 'none';
    }
}

document.getElementById('firstsurveyForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const occupation = document.getElementById('occupation').value;
    const passwordtraining = document.getElementById('passwordtraining').value;
    const passwordmanager = document.getElementById('passwordmanager').value;
    const riskbelief = document.getElementById('riskbelief').value;
    const complexityfeelings = document.getElementById('complexityfeelings').value;
    const cyberthreatknowledge = document.getElementById('cyberthreatknowledge').value;
    const passwordchange = document.getElementById('passwordchange').value;
    const authenmethods = document.getElementById('authenmethods').value;
    const otherAuth = document.getElementById('otherAuth').value;
    const reinputpassword = document.getElementById('reinputpassword').value;

    const firstsurveyData = {
        name: name,
        age: age,
        occupation: occupation,
        passwordtraining: passwordtraining,
        passwordmanager: passwordmanager,
        riskbelief: riskbelief,
        complexityfeelings: complexityfeelings,
        cyberthreatknowledge: cyberthreatknowledge,
        passwordchange: passwordchange,
        authenmethods: authenmethods === 'other' ? otherAuth : authenmethods,
        reinputpassword: reinputpassword,
    };

    localStorage.setItem('firstsurveyData', JSON.stringify(firstsurveyData));

    // Redirect to the second part of the survey
    window.location.href = 'survey2.html';
});

// Event listeners for password fields
let passwordValue;
let reinputPasswordValue;

function handlePasswordChange(event) {
    passwordValue = event.target.value;
}

function handleReinputPasswordChange(event) {
    reinputPasswordValue = event.target.value;
}

document.getElementById('password').addEventListener('input', handlePasswordChange);
document.getElementById('reinputpassword').addEventListener('input', handleReinputPasswordChange);
