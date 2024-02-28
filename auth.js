// Install necessary packages using npm install express jsonwebtoken body-parser mongoose

const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const secretKey = 'siddhiwadetiwar'; // Replace with a secure secret key

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://siddhiwadetiwar:root@cluster0.v2wphpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Define a Mongoose schema for user
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
});

// Create a Mongoose model for user
const UserModel = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Middleware for authentication and authorization
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    req.user = user;
    next();
  });
};

// Registration route to create a new user
app.post('/registration', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Check if the username already exists
      const existingUser = await UserModel.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create a new user in the database
      const newUser = new UserModel({ username, password, role: 'user' });
      await newUser.save();
  
      res.json({ message: 'Registration successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
// Login route to generate token
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Protected route that requires authentication and authorization
app.get('/protected', authenticateUser, (req, res) => {
  const user = req.user;
  res.json({ message: `Hello ${user.username}! You have access to this protected route. Your role is ${user.role}.` });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
