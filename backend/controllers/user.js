const User = require("../Models/signin")
const sendMail = require("../utils/nodemailer");
const otpGenerator = require("otp-generator");
const OTP = require("../Models/OTP");
const bcrypt = require("bcrypt");
// const signin = require("../Models/signin");
// const { otpverification } = require("./otpverify")
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/jwtHelper");
const dotenv = require("dotenv");
dotenv.config();



exports.signin = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return res.status(401).json({
                success: false,
                message: "user already exists."
            })
        }



        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
        const otpDoc = await OTP.create({ otp, expiretAt: new Date(Date.now() + 5 * 60 * 1000) });

        await sendMail.signinmail(firstName, lastName, email, otp);
        const user = await User.create({ firstName, lastName, email, password: hashedPassword, otp: otp });

        const payload = {
            userId: user._id,
            email: email,
        };

        const token = generateToken(payload);

        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        await user.updateOne({ token: token });

        return res.status(200).json({
            success: true,
            message: "user created successfully",
            User: user,
            token
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });



        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);



        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Wrong Password"
            })
        }
        const payload = {
            userId: user._id,
            email: user.email,
        };

        const token = generateToken(payload);

        res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        await user.updateOne({ token: token });

        await sendMail.loginmail(user.firstName, user.lastName, user.email);
        return res.status(200).json({
            success: true,
            message: "login successful",
            User: user,
            token
        })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

