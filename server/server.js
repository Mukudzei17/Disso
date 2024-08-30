import express from 'express';
import fs from 'fs';
import path from 'path';
import url from 'url';
import readline from 'readline';
import { hostname } from 'os';

const app = express();
app.use(express.json());
app.use(express.static('client'));

function getLoginDetails(name, password, callback) {
  const fileStream = fs.createReadStream('output.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let called = false;

  rl.on('line', (line) => {
    const [storedName, storedPassword] = line.split(',').map(item => item.split(': ')[1]);

    if (storedPassword === password && !called) {
        called = true;
        callback(null, { name: storedName, password: storedPassword });
        rl.close();
    }
  });

  rl.on('close', () => {
    if (!called) {
      callback('User not found', null);
    }
  });
}

app.post('/register', async (req, res) => {
  const { name, password } = req.body;
  const data = `Name: ${name}, Password: ${password}\n`;

  fs.appendFile('output.txt', data + '\n', (err) => {
      if (err) {
          console.error('Error writing to file', err);
          return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.json({ message: 'Data saved to file' });
  });
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  getLoginDetails(name, password, (err, userDetails) => {
    if (err) {
      console.log('Login failed:', err);
      return res.status(401).json({ message: 'Invalid login credentials' });
    } else {
      return res.json({ message: 'Login successful', user: userDetails });
    }
  });
});

app.post('/submit-survey', (req, res) => {
  const surveyData = req.body; // Extracts the survey data from the request body
  const data = JSON.stringify(surveyData) + '\n'; // Converts the survey data to a JSON string and adds a newline

  fs.appendFile('survey_results.txt', data, (err) => { // Appends the data to 'survey_results.txt'
      if (err) {
          console.error('Error writing to file', err); // Logs an error if writing to the file fails
          return res.status(500).json({ message: 'Internal Server Error' }); // Sends a 500 status code if there's an error
      }
      res.json({ message: 'Survey results saved' }); // Sends a success message if the data is saved successfully
  });
});

const PORT = process.env.PORT || 8185;
const hosntname = '0.0.0.0'
app.listen(PORT, hostname, () => {
  console.log(`Server is listening on port ${PORT}!`);
});

