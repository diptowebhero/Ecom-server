const {Schema, model, ObjectId} = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new Schema({
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 160,
        },
        slug: {
            type: String,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
            maxlength: 2000,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        category: {
            type: ObjectId,
            ref: "Category",
            required: true,
        },
        quantity: {
            type: Number,
        },
        sold: {
            type: Number,
            default: 0,
        },
        photo: {
            data: Buffer,
            contentType: String,
        },
        shipping: {
            required: false,
            type: Boolean,
        },
    },
    {timestamps: true, versionKey: false}
);

//Export the model
module.exports = model("Product", productSchema);