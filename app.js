const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || "0.0.0.0";
const bodyParser = require("body-parser")
const indexRouter = require("./routes/index")
const userRouter = require("./routes/user")
const connectDB = require("./config/db");

const session = require("express-session")

const passport = require("passport")

//Passport config
require("./config/passport")(passport);

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
connectDB();

//Session
app.use(session({
    secret: "secreting",
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge:(10*600000),  secure: false }
}))


//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.user)
    console.log(req.isAuthenticated())
    next();
})

//Routes
app.use("/api", indexRouter)
app.use("/api", userRouter)


app.listen(port, host, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log("Listening on " + port);
})