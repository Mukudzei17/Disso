let nameValue;
let emailValue;
let passwordValue;

function handleNameChange(event) {
	nameValue = event.target.value;
	console.log(`Name Value: ${nameValue}`);
}

function handleEmailChange(event) {
	emailValue = event.target.value;
	console.log(`Email Value: ${emailValue}`);
}

function handlePasswordChange(event) {
	passwordValue = event.target.value;
	console.log(`Password Value: ${passwordValue}`);
}

function handleRegisterSubmit(event) {
	console.log('submit!')
}



function prepEventListeners() {
	// const inputElements = document.querySelectorAll('.register-details')
	// inputElements.forEach((element) => element.addEventListener('keypress', handleRegister))

	document.querySelector('#name').addEventListener('input', handleNameChange);
	document.querySelector('#email').addEventListener('input', handleEmailChange);
	document.querySelector('#password').addEventListener('input', handlePasswordChange);
	document.querySelector('#submit-btn').addEventListener('click', handleRegisterSubmit);
}

prepEventListeners()