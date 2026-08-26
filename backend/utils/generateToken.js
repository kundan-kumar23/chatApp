import jwt from "jsonwebtoken"

export const generatetoken = async(newUser,res)=>
{
    const token =  jwt.sign( {
        _id : newUser._id
    },process.env.secret_code,{
        expiresIn : "7h"
    });
    res.cookie("token",token,{
        maxAge : 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false
    })
}
