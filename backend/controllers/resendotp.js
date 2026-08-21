const OTP = require("../Models/OTP");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const User = require("../Models/signin");
const sendMail = require("../utils/nodemailer");

exports.resendOtp = async(req,res)=>{
    try{ const{firstName,lastName,email,password,confirmPassword} = req.body;
    
           
            
            if(password[0]!==confirmPassword[0]){
                return res.status(400).json({
                    success:false,
                    message:"password and confirmPassword are not matched."
                })
            }
    
            const hashedPassword = await bcrypt.hash(password[0],10);
            const hashedConfirmPassword = await bcrypt.hash(confirmPassword[0],10);
            const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false,lowerCaseAlphabets: false });
            const otpDoc = await OTP.create({ otp , expiretAt: new Date(Date.now() + 5 * 60 * 1000) });
    
    
            const user = await User.create({firstName,lastName,email,password: hashedPassword, confirmPassword: hashedConfirmPassword, otp:otp});
            await sendMail.signinmail(user.firstName, user.lastName, user.email, otp);
    
    
            return res.status(200).json({
                success:true,
                message:"user created successfully and mail sent successfully",
                User:user
            })
        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }}
