const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const mg = require('mailgun-js');
const app = express();
const path = require('path');
require('dotenv').config();
const port = process.env.PORT || 5000;

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


app.post('/api/email', (req, res) => {
  const { email, properties, paintersOption, CategoriesOption } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: `${email}`,
        to: 'denmemm@gmail.com',
        html: `<p>from: ${email}</p>
        <p>Message: ${properties}</p>
        <p>Category: ${CategoriesOption}</p>
        <p>Artist: ${paintersOption}</p>`,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'Error in sending email' });
        } else {
          console.log(body);
          res.send({ message: 'Email sent successfully' });
        }
      }
    );
});

app.post('/api/busket', (req, res) => {
  const { phone, email, message } = req.body;
  mailgun()
    .messages()
    .send(
      {
        from: `${email}`,
        to: 'denmemm@gmail.com',
        html: `<p>from: ${email}</p>
        <p>phone: ${phone}</p>
        <p>email: ${email}</p>
        <p>message: ${message}</p>`,
      },
      (error, body) => {
        if (error) {
          console.log(error);
          res.status(500).send({ message: 'Error in sending email' });
        } else {
          console.log(body);
          res.send({ message: 'Email sent successfully' });
        }
      }
    );
});

app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (res, req) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const MONGO_DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.pn5jxqp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_DB_URL)
    .then(() => {
        app.listen(process.env.PORT || port)
    })


