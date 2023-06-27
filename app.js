// dependencies
const express = require('express');
const {readdirSync}=require("fs")
const app = express();

// external imports
const connectDB=require("./db/connectDB")
const notFoundHandler=require("./src/middlewares/common/notFoundHandler")
const errorHandler=require("./src/middlewares/common/errorHandler")

// security middlewares dependencies
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const checkAdmin = require("./src/middlewares/auth/checkAdmin");
const checkLogin = require("./src/middlewares/auth/checkLogin");




//rate limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

// request parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// security middlewares Implementation
app.use(helmet());
app.use(cors());
app.use(mongoSanitize());
app.use(hpp());


//routes
readdirSync("./src/routes/").map(r=>app.use("/api/v1",require(`./src/routes/${r}`)))


//test route
app.get('/', checkLogin,checkAdmin, async (req, res) => {
    res.send("Hello World");
});

//not found handler
app.use(notFoundHandler)

//default error handler
app.use(errorHandler)

//connect database
connectDB()

module.exports = app







