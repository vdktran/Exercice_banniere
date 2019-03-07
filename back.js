const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const express = require('express');
const cors = require('cors');


const dbFile = 'test.db';
const db = new sqlite3.Database(dbFile);
const app = express();
app.use( cors() );


// serialize() = otherwise asynchronous problems (INSERT before CREATE TABLE)
db.serialize( () => {

    // if ( !fs.existsSync(dbFile) ) {
        db.run('CREATE TABLE ref (id TEXT PRIMARY KEY)');
        db.run('CREATE TABLE products (name TEXT, type TEXT, price INTEGER, img TEXT, like BOOLEAN, FOREIGN KEY(type) REFERENCES ref(id))');
        db.run('INSERT INTO ref (id) VALUES (?)', 'sac');
        db.run('INSERT INTO ref (id) VALUES (?)', 't-shirt');
        db.run('INSERT INTO ref (id) VALUES (?)', 'chaussures');

        db.run('INSERT INTO products (name, type, price, img, like) VALUES (?, ?, ?, ?, ?)', 'eastpak', 'sac', 100, "https://mosaic03.ztat.net/vgs/media/catalog-sm/EV/45/1H/0D/6Q/11/EV451H0D6-Q11@11.jpg", true);
        db.run('INSERT INTO products (name, type, price, img, like) VALUES (?, ?, ?, ?, ?)', 'lacoste', "t-shirt", 20, "https://blog.codepen.io/wp-content/uploads/2017/03/codepen.jpg", false);
        db.run('INSERT INTO products (name, type, price, img, like) VALUES (?, ?, ?, ?, ?)', 'jordans', "chaussures", 50, "https://brightledshoes.com/wp-content/uploads/2017/01/gold-led-light-up-shoes.jpg", false);
    
    // }

    });

app.listen(3000, function(error) {
    if (!error) {
        console.log('all good');
    }
});

        db.all('SELECT * FROM products', function (error, data) {
            console.log(data);
        }); 

        db.all('SELECT * FROM products', function (error, data) {
            console.log(data);
        }); 

app.get('/', function(req, res) {

    db.all('SELECT * FROM products', function (error, data) {
        res.send(data);
    });
});

