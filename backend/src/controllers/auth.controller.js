import User from "../../models/User.js"
import bcrypt from "bcryptjs"
import { generatetoken } from "../../utils/generateToken.js"
export const signup = async(req,res)=>
{
    const {fullname,email,password} = req.body
    try{
        if(!email || !fullname || !password)
        {
            return res.status(400).json({
                message : "all fields are required"
            })
        }

        if(password.length < 6)
        {
            return res.status(400).json({
                message : "password must be atleast 6 character"
            }) 
        }

         const user = await User.findOne({email})
         if(user) return res.status.json({message :"email already exist"})

            const hashpassword = await bcrypt.hash(password,10)
            const newUser = await User.create({
                fullname,
                email,
                password : hashpassword
            })

            if(newUser){
                generatetoken(newUser,res)

                return res.status(200).json({
                    sucess : true,
                    message : "user register sucessfully",
                    data : newUser
                })

            }
            else{
               return res.status(400).json({message : "Invalid user data"})
            }
    }catch(err)
    {
        console.log(err)
        return res.status(500).json({
            error : true,
            message : "internal server error"
        })
    }
}