const {connect}=require("mongoose")
const dotenv = require("dotenv");
dotenv.config()
// mongoose server connection
const connectDB = () => {
    connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('MongoDB connected');
    }).catch((err) => {
        console.error('MongoDB connection error', err);
    });
}
module.exports = connectDB