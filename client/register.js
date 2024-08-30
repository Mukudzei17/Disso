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
  event.preventDefault(); // Prevent default form submission

  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>£])(?=.*[0-9].*[0-9]).{8,}$/;


  if (passwordRegex.test(passwordValue)) {
    console.log('Password is valid', passwordValue);
    alert('Password is valid: ' + passwordValue);
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameValue,
          password: passwordValue,
        }),
      });

      const data = await response.json();
      console.log('Registration successful:', data);
      alert('Registration successful');
      window.location.href = '/login.html'; // Redirect to login page
    } catch (error) {
      console.error('Error:', error);
      
    }
  } else {
    console.log('Password is invalid', passwordValue);
    alert('Password is invalid');
  }
}

function prepEventListeners() {
  document.querySelector('#name').addEventListener('input', handleNameChange);
  document.querySelector('#password').addEventListener('input', handlePasswordChange);
  document.querySelector('#register-form').addEventListener('submit', handleRegisterSubmit);
}

prepEventListeners();
