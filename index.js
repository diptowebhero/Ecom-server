const app=require("./app");
const dotenv = require("dotenv");
dotenv.config()
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});