const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')

// 1. Configure the Local Strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' }, // Specify 'email' as the username field
    async (email, password, done) => {
        try {
            // Find the user by email using async/await
            const user = await User.findOne({ email: email.toLowerCase() });

            if (!user) {
                return done(null, false, { msg: `Email ${email} not found.` });
            }

            // Use the async comparePassword method from your UserSchema
            const isMatch = await user.comparePassword(password);

            if (isMatch) {
                return done(null, user);
            }

            return done(null, false, { msg: 'Invalid email or password.' });
        } catch (err) {
            return done(err);
        }
    }
));

// 2. Serialize User (Store ID in session)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// 3. Deserialize User (Retrieve full user from ID)
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});