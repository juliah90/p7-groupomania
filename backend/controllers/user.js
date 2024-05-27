const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    const { email, password } = req.body;

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
                .then((savedUser) => {
                    const token = jwt.sign(
                        { userId: savedUser.id },
                        process.env.TOKEN_SECRET,
                        { expiresIn: '24h' }
                    );
                    res.status(201).json({
                        message: 'User added successfully',
                        userId: savedUser.id,
                        token: token
                    });
                })
                .catch((error) => {
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

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } }).then(
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
            });
        }
    );
}

exports.delete = (req, res, next) => {
    const userId = req.params.id;
    const authUserId = req.auth.userId;

    User.findByPk(userId, {})
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            if (user.id !== authUserId) {
                return res.status(403).json({ error: 'Unauthorized access' });
            }
            user.destroy()
                .then(() => {
                    res.status(200).json({ message: 'User deleted successfully' });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Failed to delete user' });
                });
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: `Internal server error: ${error.message}` });
        });
};

exports.getAccount = (req, res, next) => {
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
