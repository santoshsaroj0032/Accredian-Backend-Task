const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Santosh@1234',
    database: 'your_database_name', // Replace 'your_database_name' with your actual database name
    port: 3306
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('MySQL Connected...');
});

module.exports = db;
