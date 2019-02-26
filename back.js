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
        db.run('CREATE TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price INTEGER, img TEXT, like BOOLEAN, html TEXT)');
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', 'sac', 100, "https://mosaic03.ztat.net/vgs/media/catalog-sm/EV/45/1H/0D/6Q/11/EV451H0D6-Q11@11.jpg", true);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', "t-shirt", 20, "https://blog.codepen.io/wp-content/uploads/2017/03/codepen.jpg", false);
        db.run('INSERT INTO products (name, price, img, like) VALUES (?, ?, ?, ?)', "chaussures", 50, "https://brightledshoes.com/wp-content/uploads/2017/01/gold-led-light-up-shoes.jpg", false);
    
    // }

    // db.all('SELECT * FROM products', function (error, data) {
    //     if(!error) {
    //         app.get('/', function(req, res) {
    //             res.send(data);
    //         })
    //     }
    //     else console.log(error);
    // });

});

app.listen(3000, function(error) {
    if (!error) {
        console.log('all good');
    }
});

app.post('/', function(req, res) {

    db.run('INSERT INTO products (name, price, img, like) VALUES ("shoes", 15, "jpg4", true)');

    db.all('SELECT * FROM products', function (error, data) {
        res.send(data);
    });
}); 

// app.get('/', function(req, res) {

//     db.all('SELECT * FROM products', function (error, data) {
//         res.send(data);
//     });
// });
