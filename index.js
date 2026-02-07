// This is the entry point for the application.

const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const { mongo } = require('mongoose');

// dotenv.config(); ai added. do I need this?
const app = express();
const port = process.env.PORT || 3000; //this says use the port from the .env file or default to 3000
app
    .use(bodyParser.json())
    .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
    } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }         
});