// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html")
})
app.post("/", function (req, res) {
  var crypto = req.body.crypto;
  var amount = req.body.amount;
  var baseURL = "https://testnet.binancefuture.com/fapi/v1/ticker/price?symbol=" + crypto + "USDT"
  const options = {
    url: baseURL,
    method: "GET",
    qs: {
      from: crypto,
      amount: amount
    },
    headers: {
      'X-testing': 'testing'
    }
  };
    request(
      options,
      function (error, response, body) {
        var data = JSON.parse(body);
        console.log(baseURL)
        var price = (data.price*amount).toFixed(2);
        res.write("<p>Aktualna cena " + amount + " " + crypto + " wynosi " + price + " $")
        res.send();
      }
    );
})

app.listen(3000, function () {
    console.log("Server on 3000")
})