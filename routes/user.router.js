const express = require('express');
const { allUser, registration, loginUser } = require('../controllers/user.controller');
const { webProtection, checkUserRole } = require('../middleware/web.protection');
const router =  express.Router();


router.post("/user", registration);
router.post("/login", loginUser)

router.get("/user", webProtection, checkUserRole, allUser);


module.exports = router;