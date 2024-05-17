const User = require('../models/user');
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
        });//password protect
        user.save().then(() => {
            res.status(201).json({
                message: 'User added successfully!'
            });//added user
        }
        ).catch((error) => {
            res.status(500).json({
                error: error
            });//code no work error
        })
    })
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
    //FIXME get id from req.params
    const userId = req.auth.userId; // Get the id

    User.findByPk(userId, {})
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });//can't find user
            }
            if (user.id !== userId) {
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
