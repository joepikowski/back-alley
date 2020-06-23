const express = require('express');
const router = require('express').Router();

module.exports = (app, game, passport) => {

    //Serve Static Files
    router.use('/', express.static('ui/dist'));

    //Handle API Calls
    router.use('/api', require('./api')(game));

    router.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });

    return router;
}
