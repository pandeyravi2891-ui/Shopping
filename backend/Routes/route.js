const express = require("express");
const router = express.Router();

const { signin, login } = require("../controllers/user");
const { otpverification } = require("../controllers/otpverify")
const { resendOtp } = require('../controllers/resendotp')
const { forgotpassword, resetpassword } = require("../controllers/forgotpassword")
const { getprofile } = require("../controllers/profile")
const { detailadd } = require("../controllers/additionaldetail")
router.post("/signin", signin);
router.post("/login", login);
router.post("/otpverification", otpverification);
router.post("/resendotp", resendOtp);
router.post("/forgotpassword", forgotpassword);
router.post("/resetpassword", resetpassword);
router.get("/profile", getprofile);
router.post("/additionaldetail", detailadd);





module.exports = router