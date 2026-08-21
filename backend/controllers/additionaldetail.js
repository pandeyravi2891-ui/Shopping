const AdditionalDetail = require("../Models/additionaldetail");
const jwt = require("jsonwebtoken");
const User = require("../Models/signin");



exports.detailadd = async (req, res) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        user.phone = req.body.phone;
        user.gender = req.body.gender;
        user.dob = req.body.dob;
        user.address = req.body.address;
        await user.save();
        res.json({
            message: "Additional details added successfully",
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}   