const express = require('express');
const fs = require('fs');
const app = express();

app.post('/gradeupdate', (req, res) =>{ // localhost:50000/gradeupdate
    console.log(req);

    const json = req.json;
    const fileName = req.fileName;

    fs.writeFileSync(`../public/users/${fileName}.json`, JSON.stringify(json));
});

app.listen(50000)