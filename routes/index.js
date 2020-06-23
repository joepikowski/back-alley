const express = require('express');
const router = require('express').Router();
const bodyParser = require('body-parser')

module.exports = (app, game, passport) => {

    const requirePassword = passport.authenticate('local', {
        successRedirect: '/backalley',
        failureRedirect: '/',
        session: true
    });

    const requireSession = (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect(301, '/');
        }
    };

    router.use('/', express.static('ui/static'));

    router.use('/backalley', requireSession, require('./backalley')(app, game, passport))

    router.post('/auth', bodyParser.urlencoded({extended: true}), requirePassword );

    router.use('/.well-known/pki-validation/', express.static('ssl') );

    app.use('/', router);

}
