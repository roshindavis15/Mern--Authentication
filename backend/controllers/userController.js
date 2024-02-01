import asyncHandler from 'express-async-handler'

const authUser=asyncHandler( async(req,res)=>{
    res.status(401);
    throw new Error('Something Went Wrong');

    res.status(200).json({message:'Auth User'})
});


export {
    authUser
}