const express = require('express');
const { allUser, registration, loginUser } = require('../controllers/user.controller');
const { webProtection, checkUserRole } = require('../middleware/web.protection');
const router =  express.Router();

// Registration ond Login Router
router.post("/user", registration);
router.post("/login", loginUser)
// Admin can get All User Details
router.get("/user", webProtection, checkUserRole, allUser);


module.exports = router;