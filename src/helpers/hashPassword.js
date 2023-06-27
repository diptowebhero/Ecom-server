const bcrypt = require("bcrypt")

//password hash function
async function hashPassword(password) {
    const saltRounds = 10; // Number of salt rounds for hashing

    try {
        return await bcrypt.hash(password, saltRounds);
    } catch (error) {
        throw new Error('Password hashing failed');
    }
}

//password compare function
async function comparePasswords(plainPassword, hashedPassword) {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error) {
        throw new Error('Password comparison failed');
    }
}

module.exports = {hashPassword, comparePasswords}