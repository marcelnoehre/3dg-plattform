const express = require('express');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4200' }));

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const authRouter = require('./src/routes/auth');
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send(`Server is running at http://localhost:${port}`);
});

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;