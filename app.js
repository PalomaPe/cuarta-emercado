const express = require('express');
const fs = require('fs')

// Set up the express app
const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// get all todos
app.get('/categories/all', (req, res) => {
    const jsonString = fs.readFileSync('./categories.json')
    const categories = JSON.parse(jsonString)

  res.status(200).send(categories);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});