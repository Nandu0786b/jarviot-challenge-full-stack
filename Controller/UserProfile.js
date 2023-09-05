import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/*Register User */
export const register = async (req,res)=>{
    try {
        console.log(req.body);
        const {
            firstName,lastName,email,password} = req.body;
            const saltRounds = 10; // You can adjust the number of rounds as needed
            const salt = await bcrypt.genSalt(saltRounds);
            const passwordHash = await bcrypt.hash(password, salt);            
          const newUser = new User({firstName,lastName,email,password:passwordHash})
          const savedUser=await newUser.save();
          res.status(201).json({"stat":"Ok","message":`Welcome ${firstName}`});


    } catch (error) {
        console.log(error);
        res.status(500).json({error:error.message});
    }
}
/*  LOGGING IN */
export const login = async (req,res)=>{
  try {
    const {email,password}=req.body;
    const user = await User.findOne({email:email});
    if(!user) return res.status(400).json({msg : "User does notexist"});
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({msg : " Invalid credentials "});
    const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({token,_id:user._id,firstName:user.firstName,email:user.email});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
  }
}