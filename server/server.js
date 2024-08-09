import express from 'express';
import fs from 'fs';
import path from 'path';
import url from 'url';

const app = express();
app.use(express.json());
app.use(express.static('client'));


app.post('/register', (req, res) => {
  const { name, password} = req.body;
  const data = `Name: ${name}, Password: ${password}\n`;

  fs.appendFile('output.txt', data + '\n', (err) => {
      if (err) {
          console.error('Error writing to file', err);
          return res.status(500).send('Internal Server Error');
      }
      res.send('Data saved to file');
  });
});

app.listen(8080);

// app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client')));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Disso is listening on port ${PORT}!`);
// });