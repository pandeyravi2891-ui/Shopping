const User = require("../Models/signin")
const OTP = require("../Models/OTP");

exports.otpverification = async(req,res)=>{
    try{
        const {enteredOtp} = req.body;
       
        const user = await OTP.findOne({otp:enteredOtp});
        if(Date.now() > user.expiretAt){
            return res.status(400).json({
                success:false,
                message:"otp expired"
            })
        }
        else if(Date.now() < user.expiretAt && user){
            return res.status(200).json({
                success:true,
                message:"otp verified."
            })
        }
        else{
             return res.status(200).json({
                success:false,
                message:"otp incorrect."
            })

        }
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}