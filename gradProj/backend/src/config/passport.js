const passport = require("passport");
const { ExtractJwt, Strategy } = require("passport-jwt");
const config = require("./environment");
const User = require("../models/user.model");
const Company = require("../models/company.model");
const GoogleStrategy = require("passport-google-token").Strategy;
const keys = require("../config/keys");
const Role = require("../enums/roles.enum");
const randomstring = require("randomstring");

function googleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        
        User.findOne({ googleID: profile.id }, (err, user) => {
          if (user) {
            done(err, user);
          } else {
            let username;
            const re = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,9}$/;
            if (re.test(profile.displayName)) {
              username = profile.displayName;
            } else {
              username = "User" + `${randomstring.generate(4)}`;
            }
            new User({
              username,
              email: profile.emails[0].value,
              role: Role.User,
              confirmed: true,
              googleID: profile.id
            })
              .save()
              .then(user => {
                done(err, user);
              });
          }
        });
      }
    )
  );
}

function jwtStrategy() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  };

  const strategy = new Strategy(opts, async (token, done) => {
    const user = await User.findOne({ _id: token.id });
    if (user) {
      return done(null, user);
    } else {
      const company = await Company.findOne({ _id: token.id });
      if (company) {
        return done(null, company);
      } else {
        return done(null, false);
      }
    }
  });

  passport.use(strategy);
}


module.exports = {
  initialize: () => passport.initialize(),
  authenticate: () => passport.authenticate("jwt", { session: false }),
  authenticateGoogle: () =>
    passport.authenticate("google-token", {
      session: false,
      scope: ["profile", "email"],
      state: "myState"
    }),
  jwtStrategy,
  googleStrategy
};
