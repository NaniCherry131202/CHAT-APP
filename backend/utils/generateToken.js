import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"30d"
    })

    res.cookie("jwt",token,{
        maxAge:30*24*60*60*1000,//Milli Seconds
        httpOnly: true,//Prevent XSS attacks cross-sites scripting attacks
        sameSite:"strict", //CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV!=="development",
    })
}

export default generateTokenAndSetCookie;