const User = require('../models/seq');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// console.log(User)
/**
 * 
 * @param {*} controls user signup and prevents repeat emails
 */
exports.signup = (req, res, next) => {
    console.log('signup')
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save().then(() => {
            res.status(201).json({
                message: 'User added successfully!'
            });
        }
        ).catch((error) => {
            res.status(500).json({
                error: error
            });
        })
    })
};

/**
 * 
 * @param {*} ensures password and email are valid to help prevent account theft
 */
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                    if (!valid) {
                        return res.status(401).json({
                            error: new Error('Incorrect password!')
                        });
                    }
                    const token = jwt.sign(
                        { userId: user._id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '24h' });
                    res.status(200).json({
                        userId: user._id,
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
            });
        }
    );
}

/**
 * 
 * @param {*} delete user profile only if user is the authenticated owner of profile
 */
exports.delete = (req, res, next) => {
    const userId = req.auth.userId; //get the id

    User.findById(userId)//find user
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (user._id.toString() !== userId) {
                return res.status(403).json({ error: 'Unauthorized access' });//if not user show error
            }
            user.remove()//if auth pass, delete allowed
                .then(() => {
                    res.status(200).json({ message: 'User deleted successfully' });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Failed to delete user' });//error for failed to delete
                });
        })
        .catch(error => {
            res.status(500).json({ error: 'Internal server error' });//code no work error
        });

}