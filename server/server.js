import express from 'express';
import path from 'path';
import url from 'url';

const app = express();
app.use(express.static('client'));
app.listen(8080);

// app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), 'client')));

// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Disso is listening on port ${PORT}!`);
// });