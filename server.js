"use strict";

// imports
const express = require('express');
const path = require('path');

const app = express();

const formidable = require('formidable');
const util = require('util');
const fs = require('fs-extra');
const qt = require('quickthumb');

app.use(express.static(path.join(__dirname, 'public')));

app.post('/rest/video', (req, res) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });

    form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'uploads/';

        fs.copy(temp_path, new_location + file_name, function(err) {  
            if (err) {
                console.error(err);
            } else {
                console.log("success!")
            }
        });
    });
    // Use req.body to get the POST params, but we need something else to parse
    // the request body. See http://expressjs.com/en/api.html#req.body
});


app.listen(3000);
