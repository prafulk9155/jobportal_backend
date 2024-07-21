const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jobportal_db',
});

const promisePool = pool.promise();

// Test the database connection
promisePool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the MySQL database');
        connection.release(); // Don't forget to release the connection
    })
    .catch(err => {
        console.error('Error connecting to the MySQL database:', err.message);
    });

module.exports = promisePool;
