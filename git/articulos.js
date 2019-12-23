const express = require('express');
const app = express();
const morgan = require('morgan');

// middleeares
app.use(morgan('dev'));

// satarting the server
app.listen(3000, () => {
    console.log('Server on port $(3000)');
});