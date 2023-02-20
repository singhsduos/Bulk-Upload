const bodyParser = require('body-parser');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const fileRoute = require('./routes/fileRoute');
require('express-async-errors');

const app = express();
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileRoute.routes);


process.on('unhandledRejection', ex => {
  throw ex;
});

app.listen(3000, () => {
  require('./db')();
  console.log('App is listening on url http://localhost:' + 3000);
});
