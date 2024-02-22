const express = require('express');
const { allUser, registration, userUpdate, loginUser } = require('../controllers/user.controller');
const router =  express.Router();


router.get("/user",allUser);
router.post("/user",registration);
router.put("/user/:id",userUpdate);

router.post("/login",loginUser)

module.exports = router;