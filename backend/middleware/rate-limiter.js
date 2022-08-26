/* Modules */
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 4, // 3 tentatives avant blocage
    message: "Trop de tentatives, veuillez réessayer ultérieurement"
});

module.exports = loginLimiter;