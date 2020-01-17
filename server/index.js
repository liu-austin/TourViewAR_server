require("dotenv").config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const router = require('./router.js')
const cors = require('cors');


const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(compression());

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', router)

app.listen(PORT, () =>
    console.log(`Server is up on port ${PORT}`));