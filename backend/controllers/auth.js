const User = require('../models/user');
const shortId = require('shortid');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    User.findOne({email: req.body.email}).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'Email is taken'
            })
        }

        const {name, email, password} = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({name, password, email, profile, username})
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }

            // res.json({
            //     user: success
            // })

             res.json({
                 message: 'Signup success! Please signin.'
             })
        })
    })
};

exports.signin = (req, res) => {
    const {email, password} = req.body;

    // Check if the user exists
    User.findOne({email}).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User email does not exist.'
            })
        }

        // Authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Email and password do not match.'
            })
        }

        // Generate a token and send to client
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.cookie('token', token, {expiresIn: '1d'});
        const {_id, usernme, name, email, role} = user;
        return res.json({
            token,
            user: {_id, usernme, name, email, role}
        })
    })
};

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({
        message: 'Successfully signed out'
    })
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET
});