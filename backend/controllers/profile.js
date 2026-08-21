const User = require("../Models/signin");
const jwt = require("jsonwebtoken");

exports.getprofile = async (req, res) => {
    try {
        const token = req.headers.token;
        console.log("in profile", token);

        if (!token) {
            return res.status(401).json({
                message: "Token required",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(decoded);

        req.userId = decoded.userId;
        const user = await User.findById(req.userId);

        res.json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            phone: user.phone,
            dob: user.dob,
            address: user.address,
            joinedDate: user.joinedDate,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

