let nameValue;
let emailValue;
let passwordValue;

function handleNameChange(event) {
	nameValue = event.target.value;
	console.log(`Name Value: ${nameValue}`);
}

function handlePasswordChange(event) {
	passwordValue = event.target.value;
	console.log(`Password Value: ${passwordValue}`);
}

async function handleRegisterSubmit(event) {
	event.preventDefault()
	const response = await fetch('register', {
		method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
		body: JSON.stringify({
			name: nameValue,
			password: passwordValue
		})
	});
	if (response.ok) {
		const text = await response.text()
		console.log('Success:', text);
		return text;
	} else {
		console.error('Error')
	}
}



function prepEventListeners() {
	// const inputElements = document.querySelectorAll('.register-details')
	// inputElements.forEach((element) => element.addEventListener('keypress', handleRegister))

	document.querySelector('#name').addEventListener('input', handleNameChange);
	document.querySelector('#password').addEventListener('input', handlePasswordChange);
	document.querySelector('#submit-btn').addEventListener('click', handleRegisterSubmit);
}

prepEventListeners()