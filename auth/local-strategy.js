const config = require('../config');
const LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy((username, password, done) => {
    if (password === config.app.password){
        return done(null, { name: username });
    }else{
        return done(null, false, { message: 'Incorrect password.' });
    }
});
