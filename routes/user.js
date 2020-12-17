const express = require("express");
const router = express.Router();
const User = require("../models/User")
const bcrypt = require("bcryptjs");

const passport = require("passport")
const auth=require("../middlewares/authControl")

//Login-PAGE
router.get("/login", (req, res, next) => {
    res.json({ message: "Login" })
})
//Login-PAGE
router.get("/register", (req, res, next) => {
    res.json({ message: "Register" })
})

router.post("/login", (req, res, next) => {

    passport.authenticate('local', function (err, user, info) {
        if (err) throw err;
        if (user) {
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                return res.json({ user })
            });
        }
        if (info) {
            return res.json({ error: info })
        }

    })(req, res, next);
})

router.post("/logout", auth,async (req, res, next) => {
    req.logout();
    res.json({ message: "Logout" });
})


router.post("/register", async (req, res, next) => {
    const { name, email, password, password2 } = req.body;
    let error = [];
    console.log(req.body)
    console.log(name)
    //Check Required fields
    if (!name || !email || !password || !password2) {
        error.push({ msg: "Please fill in all fields" });
    }
    if (password.length < 6) {
        error.push({ msg: "Password should be at least 6 characters" })
    }

    if (password != password2) {
        error.push({ msg: "Passwords do not match" });
    }

    if (error.length > 0) {
        res.json({ error })
    } else {
        //Devam
        const user = await User.findOne({ email: email });
        if (user) {
            error.push({ msg: "Email is already registered" })
            res.json({ error })
        } else {
            const newUser = new User({
                name,
                email,
                password

            });
            //Hash Password

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;

                    //Set password to hash
                    newUser.password = hash;

                    //Save User
                    newUser.save().then((user) => {
                        console.log(user)
                        res.json(user);
                    }).catch(console.log(err));
                })
            })

        }
    }


})




module.exports = router;
