// Modules
const express = require('express');
const path = require('path');
require('dotenv').config();

// Initialization
const app = express();
const port = 3000,
  host = 'localhost';
app.listen(port, host, () => {
  console.log(`Serving in http://${host}:${port}`);
});

// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello World');
});
