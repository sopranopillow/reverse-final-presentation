const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
var jsonParser = bodyParser.json()

try {
  app.post('/gradeupdate', jsonParser, (req, res) =>{

    const json = req.body.json;
    const fileName = req.body.fileName;

    try {
      const filePath = path.join(__dirname.replace('scripts', ''), 'public/users/', fileName + '.json');
      const fd = fs.openSync(filePath, 'w+');
      fs.writeSync(fd, JSON.stringify(json));
      fs.close(fd);
      res.send("Grades updated");
    }catch(err) {
      console.log(err)
      res.send(err)
    }
  });
} catch (err) {
  process.exit(1);
}

app.listen(50000);