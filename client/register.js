let nameValue;
let emailValue;
let passwordValue;

function handleNameChange(event) {
	nameValue = event.target.value;
	console.log(`Name Value: ${nameValue}`);
}

function handlePasswordChange(event) {
	passwordValue = event.target.value;
}

async function handleRegisterSubmit(event) {
	event.preventDefault()

	// 8 characters, 1 capital letter, 1 special character, and 2 numbers
	const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9].*[0-9]).{8,}$/;

	if (passwordRegex.test(passwordValue)) {
		// console.log('Password is valid', passwordValue);
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
	} else {
			console.log('Password is invalid', passwordValue);
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