const express = require('express');
const router = express.Router();
const { signup, signin, signout, requireSignin } = require('../controllers/auth');

// Validation
const {runValidation} = require('../validation');
const {userSignupValidator, userSigninValidator} = require('../validation/auth');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);

// Test
router.get('/secret', requireSignin, (req, res) => {
    res.json({
        message: 'You can access the secret page.'
    })
});

module.exports = router;