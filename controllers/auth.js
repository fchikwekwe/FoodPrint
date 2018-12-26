/*
* Authentication
*/

const jwt = require('jsonwebtoken');
const Profile = require('../models/profile');

module.exports = (app) => {
    // SIGN-UP GET
    app.get('/sign-up', (req, res) => {
        const currentUser = req.profile;
        res.render('sign-up', { currentUser });
    });

    // SIGN-UP POST
    app.post('/sign-up', (req, res) => {
        // CREATE USER
        const profile = new Profile(req.body);
        profile.save()
            .then(() => {
                const token = jwt.sign({
                    _id: profile._id
                }, process.env.SECRET, {
                    expiresIn: '60 days',
                });
                res.cookie('nToken', token, {
                    maxAge: 900000,
                    httpOnly: true,
                });
                res.redirect(`/profiles/${profile._id}`);
            })
            .catch((err) => {
                console.log(err.message);
                return res.status(400).send({ err });
            });
    });

    // LOGIN GET
    app.get('/login', (req, res) => {
        const currentUser = req.profile;
        res.render('login', { currentUser });
    });

    // LOGIN POST
    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // Find this username
        Profile.findOne({ username }, 'username password')
            .then((profile) => {
                if (!profile) {
                    // User not found
                    return res.status(401).send({
                        message: 'Wrong username or password!'
                    });
                }
                // Check the password
                profile.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                        return res.status(401).send({
                            message: 'Wrong password!',
                        });
                    }
                    // Create a token
                    const token = jwt.sign({
                        _id: profile._id,
                        username: profile.username,
                    }, process.env.SECRET, {
                        expiresIn: '60 days',
                    });
                    // Set a cookie and redirect to the root
                    res.cookie('nToken', token, {
                        maxAge: 900000,
                        httpOnly: true,
                    });
                    res.redirect(`/profiles/${profile._id}`);
                });
            })
            .catch((err) => {
                console.log(err);
            });
    });

    // LOGOUT
    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        res.redirect('/');
    });
};
