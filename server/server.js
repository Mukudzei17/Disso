import express from 'express';
import fs from 'fs';
import path from 'path';
import url from 'url';
import readline from 'readline';

const app = express();
app.use(express.json());
app.use(express.static('client'));

function getLoginDetails(email, password, callback) {
  const fileStream = fs.createReadStream('output.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  rl.on('line', (line) => {
    const [storedName, storedPassword] = line.split(',').map(item => item.split(': ')[1]);

    if (storedPassword === password) {
        callback(null, { name: storedName, password: storedPassword });
        rl.close();
    }
  });

  rl.on('close', () => {
      callback('User not found', null);
  });
}

app.get('/register', getLoginDetails)


app.post('/register', (req, res) => {
  const { name, password } = req.body;
  const data = `Name: ${name}, Password: ${password}\n`;

  fs.appendFile('output.txt', data + '\n', (err) => {
      if (err) {
          console.error('Error writing to file', err);
          return res.status(500).send('Internal Server Error');
      }
      res.send('Data saved to file');
  });
});

app.post('/login', (req, res) => {
  const { name, password } = req.body;

  getLoginDetails(name, password, (err, userDetails) => {
    if (err) {
      console.log('Login failed:', err);
      if (!res.headersSent) {
          return res.status(401).json({ message: 'Invalid login credentials' });
      }
    } else {
      console.log('Login successful:', userDetails);
      if (!res.headersSent) {
          return res.json({ message: 'Login successful', user: userDetails });
      }
    }
  });
});

app.listen(8080);

// app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client')));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Disso is listening on port ${PORT}!`);
// });