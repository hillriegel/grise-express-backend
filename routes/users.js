
import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();



// POST /users to create a new user
router.post('/', async (req, res) => {
    const { username, firstName, lastName, email, password } = req.body;
    try {
        const newUser = new User({ username, email, password, firstName, lastName});
        await newUser.save();
        res.status(201).send({ id: newUser._id, username: newUser.username, firstName: 
            newUser.firstName, lastName: newUser.lastName, 
            email: newUser.email, createdAt: newUser.createdAt });
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;

/*
curl -X POST -H "Content-Type: application/json" -d '{"username": "johndoe", 
"firstName": "grisecon", "email": "john@example.com", "password": "securepassword123"}' 
http://localhost:3003/users
*/