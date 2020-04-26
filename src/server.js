const PRD = process.env.NODE_ENV !== 'production';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
if(!PRD)
    app.use(morgan('dev'));

app.use(bodyParser.json());

const { PORT } = process.env;

const mainRouter = express.Router();

const routes = require('./api/routes');
mainRouter.use('/client', routes.clientRouter);

app.use(express.static(__dirname + '/public'));

app.use('/api/v1', mainRouter);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT} `)
});



