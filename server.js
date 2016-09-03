"use strict";

// imports
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.post('/rest/video', (req, res) => {
    // Use req.body to get the POST params, but we need something else to parse
    // the request body. See http://expressjs.com/en/api.html#req.body
});

app.listen(3000);
