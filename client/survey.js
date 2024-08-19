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

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const occupation = document.getElementById('occupation').value;
    const passwordchange = document.getElementById('passwordchange').value;
    const passwordreuse = document.getElementById('passwordreuse').value;
    const authenmethods = document.getElementById('authenmethods').value;
    const otherAuth = document.getElementById('otherAuth').value;
    const passwordstorage = document.getElementById('passwordstorage').value;
    const otherPassword = document.getElementById('otherpass').value;

    const surveyResults = {
        name: name,
        age: age,
        occupation: occupation,
        passwordchange: passwordchange,
        passwordreuse: passwordreuse,
        authenmethods: authenmethods === 'other' ? otherAuth : authenmethods,
        passwordstorage: passwordstorage === 'other' ? otherPassword : passwordstorage,
    };

    console.log('Survey results:', surveyResults);
    alert('Thank you for completing the survey!');

    let surveyResultsText = '';
    for (const [key, value] of Object.entries(surveyResults)) {
        surveyResultsText += `${key}: ${value}\n`;
    }

    // Create a text file
    const blob = new Blob([surveyResultsText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    // Create a link to download the file
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survey_results.txt';
    document.body.appendChild(a);
    a.click();

    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
