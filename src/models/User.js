const {Schema, model} = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"

    },
});

//Export the model
module.exports = model("User", userSchema);
