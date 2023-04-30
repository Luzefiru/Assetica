/* Modules */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

/* Initialization */
const app = express();
const port = 3000,
  host = 'localhost';
app.listen(port, host, () => {
  console.log(`Serving in http://${host}:${port}`);
});

/* Database Connection */
mongoose.set('strictQuery', false);
mongoose.connect(process.env.CONNECTION_STRING);

/* Settings */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World');
});
