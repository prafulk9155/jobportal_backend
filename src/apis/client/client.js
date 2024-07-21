const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); 

const jwtSecret = process.env.JWT_SECRET; // Get jwtSecret from environment variables
const jwtExpirationTime = process.env.JWT_EXPIRATION_TIME; 


const saltRounds = 10; 

async function getAllUsers(req, res) {
    try {
        const [rows, fields] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function register_user(req, res) {
    const { username, password, role, email } = req.body.data; // Assuming req.body contains the 'data' object

    try {
        // Check if the user already exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const [result] = await db.query('INSERT INTO users (username, password, role_id, email) VALUES (?, ?, ?, ?)', 
            [username, hashedPassword, role, email]);
        
        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function login_user(req, res) {
    const { email, password } = req.body.data;

    try {
        // Check if the user exists
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length === 0) {
            return res.status(400).json({ error:true, message: 'Invalid email or password' });
        }

        const user = existingUser[0];

        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error:true, message: 'Invalid email or password' });
        }

        // Fetch menus based on role_id
        const [menus] = await db.query('SELECT menu FROM menus WHERE role_id = ?', [user.role_id]);
        if (menus.length === 0) {
            return res.status(400).json({ error: 'Menu items not found for this role' });
        }

        const menu = JSON.parse(menus[0].menu); // Parse the JSON string

        // Generate and return JWT token
        const token = jwt.sign({ userId: user.id, role: user.role_id }, jwtSecret, { expiresIn: jwtExpirationTime });

        res.json({ message: 'Login successful', token, menu });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    register_user,
    login_user
};


module.exports = {
    getAllUsers,
    register_user,
    login_user
};
