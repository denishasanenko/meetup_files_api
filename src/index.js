const fs = require('fs');
const express = require('express');
const multiparty = require('multiparty');
const uuid = require('uuid/v1');

const port = process.env.APP_PORT || 3001;

const app = express();

// promote static files
app.use(express.static('files'));

// endpoint for save files
app.post('/', (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        const file = files.file[0];
        const ext = file.originalFilename.split(".").slice(-1)[0];
        const fileName = `${uuid()}.${ext}`;
        fs.copyFileSync(file.path, `./files/${fileName}`);
        console.log(`File ${fileName} loaded`);
        res.json({filename: fileName});
    });
});

app.listen(port, () => console.log(`Files API listening on port ${port}!`))