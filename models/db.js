const mysql = require('mysql');
 

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Santosh@1234',
    database: ' db',
    port: 3306
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('MySQL Connected...');
});

module.exports = db;

 