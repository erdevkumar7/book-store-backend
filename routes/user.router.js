const express = require('express');
const { allUser, registration, loginUser } = require('../controllers/user.controller');
const router =  express.Router();


router.post("/user", registration);
router.post("/login", loginUser)

router.get("/user", allUser);


module.exports = router;