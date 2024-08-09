let nameValue;
let passwordValue;

function handleNameChange(event) {
	nameValue = event.target.value;
	console.log(`Name Value: ${nameValue}`);
}

function handlePasswordChange(event) {
	passwordValue = event.target.value;
}

async function handleRegisterSubmit(event) {
	const response = await fetch('login', {
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
		const data = await response.json();
		console.log('Login successful:', data);

		window.location.href = '/inshide.html';
} else {
		console.error('Login failed:', response.statusText);
}
}

function prepEventListeners() {

	document.querySelector('#name').addEventListener('input', handleNameChange);
	document.querySelector('#password').addEventListener('input', handlePasswordChange);
	document.querySelector('#submit-btn').addEventListener('click', handleRegisterSubmit);
}

prepEventListeners()