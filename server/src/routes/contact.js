const express = require("express");
const router = express.Router();
const {submitContact,getMessages} = require("../controllers/contactController");

router.post("/", submitContact);

router.get("/", getMessages);

module.exports = router;