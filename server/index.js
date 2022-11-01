const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'CMBrfq45',
    database: 'project_mobile',
})

app.get('/category', (req, res) => {
    db.query("SELECT * FROM category", (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result);
        }
    })
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })