const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");

const bcrypt = require("bcryptjs");

const passportJs = async (passport) => {
    passport.use(
        new localStrategy({ usernameField: "email", session: true }, async (email, password, done) => {
            try {
                //Match User
                const user = await User.findOne({ email: email });
                if (!user) {
                    return done(null, false, { message: "That email is not registed !" })
                }
                //Match Password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Password incorrect" })
                    }
                })

            } catch (error) {
                console.log(error)
            }
        })

    );

    passport.serializeUser((user, done) => {
        console.log("Login")

        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log("Logout")
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });



}

module.exports = passportJs;