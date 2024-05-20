import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;  // You can adjust the number of rounds, the higher, the more secure (and slower)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving the user
userSchema.pre('save', function(next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return next();

    // Generate a salt and hash the password
    bcrypt.hash(this.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

const User = mongoose.model('User', userSchema, 'users');

export default User;