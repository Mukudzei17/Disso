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

  // 8 characters, 1 capital letter, 1 special character, and 2 numbers
  const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9].*[0-9]).{8,}$/;

  if (passwordRegex.test(passwordValue)) {
    console.log('Password is valid', passwordValue);
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

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('username', nameValue);
        console.log('Registration successful:', data);
        window.location.href = '/login.html';
      } else {
        console.error('Registration failed:', response.statusText);
        alert('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.log('Password is invalid', passwordValue);
  }
}

function prepEventListeners() {
  document.querySelector('#name').addEventListener('input', handleNameChange);
  document.querySelector('#password').addEventListener('input', handlePasswordChange);
  document.querySelector('#register-form').addEventListener('submit', handleRegisterSubmit);
}

prepEventListeners();
