import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'

const authUser=asyncHandler( async(req,res)=>{
      
const{email,password} =req.body;

const user=await User.findOne({email});

if(user && (await user.matchPassword(password))){
    generateToken(res,user._id);
    res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email
    })
}else{
    res.status(400);
    throw new Error('Invalid email or password');
}
    throw new Error('Something Went Wrong');

    res.status(200).json({message:'Auth User'})
});

const   registerUser=asyncHandler(async(req,res)=>{

    const {name,email,password}=req.body;

    const userExist=await  User.findOne({email})

    if(userExist){
        res.status(400);
        throw new Error ('User already exist')
    }

    const user=await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res,user._id);
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400);
        throw new Error('invalid user data')
    }
    console.log(req.body)
    res.status(200).json({message:'Register User'})
});

const logoutUser= asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires: new Date(0),
    })
    res.status(200).json({message:'User logged out successfully..'})
});

const getUserProfile= asyncHandler(async(req,res)=>{

    const user={
        _id:req.user._id,
        name:req.user.name,
        email:req.user.email
    }
    res.status(200).json(user); 
});

const updateUserProfile= asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id);

    if(user){
       user.name=req.body.name || user.name;
       user.email=req.body.email || user.email;

    }else{
      res.status(404);
      throw new Error('User not found')
    }
    res.status(200).json({message:'Update user profile'})
})

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
}