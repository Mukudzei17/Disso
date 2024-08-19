let usernameValue;
let passwordValue;

function handleUsernameChange(event) {
  usernameValue = event.target.value;
  console.log(`Username Value: ${usernameValue}`);
}

function handlePasswordChange(event) {
  passwordValue = event.target.value;
}

async function handleLoginSubmit(event) {
  event.preventDefault(); // Prevent default form submission

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: usernameValue,
        password: passwordValue,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Login successful:', data);
      window.location.href = '/survey.html';
    } else {
      console.error('Login failed:', response.statusText);
      alert('Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

function prepEventListeners() {
  document.querySelector('#username').addEventListener('input', handleUsernameChange);
  document.querySelector('#password').addEventListener('input', handlePasswordChange);
  document.querySelector('#login-form').addEventListener('submit', handleLoginSubmit);
}

prepEventListeners();
