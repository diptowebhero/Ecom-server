const {Schema, model} = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const categorySchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
    },
}, {timestamps: true, versionKey: false});

//Export the model
module.exports = model("Category", categorySchema);

