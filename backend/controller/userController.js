import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import createToken from "../utils/cerateToken.js"
export const createUser = asyncHandler(async(req,res,next)=>{
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        throw new Error("Please fill all fields")
    }

    const existedUser = await User.findOne({email})
    if (existedUser) res.status(400).send("User already exists")
  const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
  

    try {
        await newUser.save()
        createToken(res,newUser._id)
        res.status(201).json({
            _id : newUser._id,
            username : newUser.username,
            email : newUser.email,
            isAdmin: newUser.isAdmin,
        })
    } catch (error) {
        
        console.log(error);
        res.status(401)
        throw new Error("Invalid user data")    
    }
})


export const logoutUser = asyncHandler(async(req,res,next)=>{
    res.cookie("jwt", "", {
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(201).json({message : "Logout successfully"})
})
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      createToken(res, existingUser._id);

      res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      });
    } else {
      res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    res.status(401).json({ message: "User not found" });
  }
});

export const logoutCurrentUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

export const getAllUsers = asyncHandler(async(req,res,next)=>{
    const user = await User.find({})
    res.json(user)

})

export const getCurrentUserProfile = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(201).json({
            _id : user._id,
            username : user.username,
            email : user.email,
            password : user.password
        })
    }else{
        res.status(401)
        throw new Error("User not found")
    }
})

 export const updateCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
  
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        user.password = hashedPassword;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });
  
  