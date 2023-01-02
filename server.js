const express = require('express');
const dotenv = require('dotenv');
const mg = require('mailgun-js');
const app = express();
const path = require('path');
require('dotenv').config();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/assets"));
app.use('/api/planes', require('./routes/planes'))
app.use('/api/painters', require('./routes/painters'))
app.use('/api/categories', require('./routes/categories'))

app.get('/', (req, res) => {
    res.send('Hellow world!')
});


dotenv.config();

const mailgun = () =>
  mg({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMIAN,
  });


app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (res, req) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(process.env.PORT || port)




