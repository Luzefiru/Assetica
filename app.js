/* Modules */
require('dotenv').config();
const express = require('express');
const { connect } = require('http2');
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
const connectToDatabase = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('Connected to database.');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

connectToDatabase();

/* Settings */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* Middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* Routers */
app.use('/item', require('./routes/itemRouter'));
app.use('/category', require('./routes/categoryRouter'));

app.get('/', (req, res) => {
  res.send(process.env.CONNECTION_STRING);
});
