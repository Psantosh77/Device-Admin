import passport from "passport";
import Google from "passport-google-oauth2";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import Admin from "../models/AdminModel.js";

const GoogleStrategy = Google.Strategy;

const GOOGLE_CLIENT_ID ="67971737934-ev4aoopfvnmc3olfm1cmusp1k17jd685.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "https://api-5olc.onrender.com/google/callback"
    },

    async (accessToken, refreshToken, profile, done) => {

      const newUser = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value
      };


      try {
        let user = await Admin.findOne({
          where: {
            googleId: profile.id,
          },
        });

        console.log(user);

        if (user) {
          const userId = user.id;
          const userName = user.name;
          const userEmail = user.email;

          const refreshToken = jwt.sign(
            { userId, userName, userEmail },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );

          await Admin.update({token: refreshToken},{
            where:{
                id: userId
            }
          });

          let userupdate = await Admin.findOne({
            where:{
                id: userId
            }
          });

          done(null, userupdate);
        } else {
          
          user = await Admin.create(newUser);
          const userId = user.id;
          const userName = user.name;
          const userEmail = user.email;

          const refreshToken = jwt.sign(
            { userId, userName, userEmail },
            process.env.REFRESH_TOKEN_SECRET,
            {
              expiresIn: "1d",
            }
          );

          await Admin.update({token: refreshToken},{
            where:{
                id: userId
            }
          });

          let userupdate = await Admin.findOne({
            where:{
                id: userId
            }
          });

          done(null, userupdate);
        }
      } catch (err) {
        console.error(err);
      }
    }

    // function(request, accessToken, refreshToken, profile, done) {

    //     return done(null, profile);
    // console.log("accessToken",accessToken);

    // console.log("Profile",profile);

    //   res.cookie('refreshToken', refreshToken,{
    //     httpOnly: true,
    //     maxAge: 24 * 60 * 60 * 1000
    // });

    // process.nextTick(function () {
    //   return done(null, [{token:accessToken}, {rToken:refreshToken}, {profile:profile}]);
    // });

    // cb(null, profile);
    // }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
