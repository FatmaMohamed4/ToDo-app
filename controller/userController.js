const User =require('../model/userModel');
const connectDB = require ('../connectDB');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

class userController {
  static register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const db = await connectDB();
        const collection = db.collection('user');
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existEmail = await collection.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // If email doesn't exist, hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPassword };
        await collection.insertOne(newUser);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

  static logIn = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const db = await connectDB();
        const collection = db.collection('user');

        const { email, password } = req.body;
        const user = await collection.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Authentication successful, here you may generate a JWT token and send it back to the client

        res.status(200).json({ message: 'Logged in successfully ' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
}

module.exports = userController ;