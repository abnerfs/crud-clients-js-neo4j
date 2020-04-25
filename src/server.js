const PRD = process.env.NODE_ENV !== 'production';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
if(!PRD)
    app.use(morgan('dev'));

app.use(bodyParser.json());

const { PORT } = process.env;

const routes = require('./routes');
app.use('/client', routes.clientRoutes);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT} `)
});



