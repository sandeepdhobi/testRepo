const express = require('express')
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var users = require('./components');
const app = express()
const port = 3000

try {
    mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
} catch (error) {
    console.log("Errror occure while connectiong to database");
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(users);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})