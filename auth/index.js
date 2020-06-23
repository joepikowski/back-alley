const localStrategy = require('./local-strategy.js');


module.exports = (app, passport, session) => {

    passport.use('local', localStrategy);

    passport.serializeUser((user, done) => {
        done(null, user.name);
    });

    passport.deserializeUser((user, done) => {
        done(null, { name: user});
    });

    app.use(passport.initialize());

    app.use(passport.session());

}
