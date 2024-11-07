import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//Register User

export const registerUser = async (req, res) =>{
    const {name, email, password} = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists){
          return res.status(400).json({message:'User Already Exists'});
        }
        const newUser = new User({name, email, password});

        await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT, { expiresIn: '1h' });
      res.status(201).json({message:'User Registered', token});
    }catch(error){
        res.status(500).json({message:'Server error!'});
    }
};

//Login User

export const loginUser = async (req,res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT, { expiresIn: '1h' });

    res.status(200).json({ message:"Loged In",token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}