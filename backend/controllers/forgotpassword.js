const User = require("../Models/signin");
const sendmail = require("../utils/nodemailer");
const otpGenerator = require("otp-generator");
const OTP = require("../Models/OTP");
const bcrypt = require("bcrypt");

exports.forgotpassword = async(req,res)=>{
    try{
        const {email} = req.body;
         const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false });
        const otpDoc = await OTP.create({ otp , expiretAt: new Date(Date.now() + 5 * 60 * 1000) });
        const user = await User.findOneAndUpdate({email}, { otp: otpDoc.otp }, { new: true });

        if(!user){
            return res.status(404).json({
                success:false,
                message:"user not found",})}

        

        await sendmail.forgotpasswordmail(user.firstName, user.lastName, user.email, otp);


        return res.status(200).json({
            success:true,
            message:"user found",
        })
    }
        catch(err){
            return res.status(500).json({
                success:false,
                message:err.message,
            })
        }}

exports.resetpassword = async(req,res,email)=>{
        try{
            
            const{otp,password,confirmpassword} = req.body;
            const hashedpassword = await bcrypt.hash(password[0],10);
            const hashedconfirmpassword = await bcrypt.hash(confirmpassword[0],10);

            const user = await User.findOneAndUpdate({otp},{password: hashedpassword, confirmPassword: hashedconfirmpassword},{new: true});

            return res.status(200).json({
                success:true,
                message:"password reset successful",
            })}
        catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
        })}
}


