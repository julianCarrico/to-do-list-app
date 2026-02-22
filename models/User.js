const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String
})


// Password hash middleware.

UserSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    try {
        // Automatically generates salt and hashes in one go
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    } catch (err) {
        next(err);
    }
});


// Helper method for validating user's password.

UserSchema.methods.comparePassword = async function (candidatePassword, cb) {
    try {
        // Returns true if passwords match, false otherwise
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (err) {
        // Rethrow or handle encryption/comparison errors
        throw new Error(err);
    }
};


module.exports = mongoose.model('User', UserSchema)
