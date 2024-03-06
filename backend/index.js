const express = require('express');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(`Server is running at http://localhost:${port}`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;