const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const config = require('../config');
const User = require('../models/UserSchema');


passport.use('login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, async (username, password, done) => {
  try {
    const userDocument = await User.findOne({username: username}).exec();
    const passwordsMatch = await userDocument.isValidPassword(password, userDocument.password);

    if (passwordsMatch) {
      return done(null, userDocument);
    } else {
      return done(null, 'Incorrect Username / Password');
    }
  } catch (error) {
    done(error);
  }
}));

passport.use(new JWTStrategy({
    jwtFromRequest: req => req.cookies.jwt,
    secretOrKey: config.JWT_SECRET,
    jwtFromRequest : ExtractJWT.fromHeader(config.JWT_SECRET)
  },
  (jwtPayload, done) => {
    return done(null, jwtPayload);
  }
));