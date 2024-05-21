const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * 
 * @param {*} controls user signup and prevents repeat emails
 */
exports.signup = (req, res, next) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    bcrypt.hash(password, 10)
        .then((hash) => {
            const user = new User({
                email: email,
                password: hash
            });

            user.save()
                .then(() => {
                    res.status(201).json({ message: 'User added successfully' });
                })
                .catch((error) => {
                    // Check for duplicate key error (email already exists)
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        res.status(400).json({ error: 'Email already exists' });
                    } else {
                        res.status(500).json({ error: 'Failed to add user' });
                    }
                });
        })
        .catch((error) => {
            res.status(500).json({ error: 'Failed to hash password' });
        });
};


/**
 * 
 * @param {*} ensures password and email are valid to help prevent account theft
 */
exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')//find user
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect password!')//authenticate password
                        });
                    }
                    const token = jwt.sign(
                        { userId: user.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '24h' });
                    res.status(200).json({
                        userId: user.id,
                        token: token
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });// code no work error
        }
    );
}

/**
 * 
 * @param {*} delete user profile only if user is the authenticated owner of profile
 */
exports.delete = (req, res, next) => {
    const userId = req.params.id; // Get the user ID from request parameters
    const authUserId = req.auth.userId; // Get the authenticated user ID from the token

    User.findByPk(userId, {})
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });//can't find user
            }
            if (user.id !== authUserId) {
                return res.status(403).json({ error: 'Unauthorized access' });//not authorized
            }
            user.destroy()
                .then(() => {
                    res.status(200).json({ message: 'User deleted successfully' });//it worked
                })
                .catch(error => {
                    res.status(500).json({ error: 'Failed to delete user' });//it did not work
                });
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: `Internal server error: ${error.message}` });//code no work
        });
};


exports.updateProfile = (req, res, next) => {
    const userId = req.auth.userId;
    const { name, position, aboutMe } = req.body;
    const profilePicture = req.file ? req.file.path : null;

    User.update({ name, position, aboutMe, profilePicture }, { where: { id: userId } })
        .then(() => res.status(200).json({ message: 'Profile updated successfully' }))
        .catch(error => res.status(500).json({ error }));
};


exports.getProfile = (req, res, next) => {
    const userId = req.auth.userId;
    User.findByPk(userId)
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.status(200).json(user);
        })
        .catch(error => res.status(500).json({ error }));
};
