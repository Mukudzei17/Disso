function handleLogin() {
	// const passwordElement = document.querySelector('#password')
	console.log('key press')
	
}

function prepEventListeners() {
	document.querySelector('#password').addEventListener('keydown', handleLogin);
}
prepEventListeners()