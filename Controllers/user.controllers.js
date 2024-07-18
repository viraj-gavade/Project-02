const User = require('../Models/user.models')
const asyncHandlers = require('../utils/asyncHandler')
const CustomApiError = require('../utils/customApiError')
const customApiResponse = require('../utils/customApiResponse')
const uploadFile = require('../utils/cloudinary')



const registerUser = asyncHandlers(async(req,res)=>{
   const { username , password , email } = req.body
//    console.log(req.file)
   if(!username || !password ||!email ){
    throw new CustomApiError(
        401,
        'All fields are necessary please fill all the required fields'
    )
   }

   const ProfilePictureLocalPath = req.file?.path

   if(!ProfilePictureLocalPath){
    throw new CustomApiError(
        401,
        'Unable to find local path of the file'
    )
   }
   const profileImg = await uploadFile(ProfilePictureLocalPath)

   if(!profileImg.url){
    throw new CustomApiError(
        501,
        'Something went wrong while uploading the file on cloudinary!'
    )
   }

//TODO:Add password hashing algorithm before moving to next route

   const user = await User.create({
    username:username,
    password:password,
    email:email,
    profileImg:profileImg?.url
   })

const checkuser = await User.findById(user._id).select('-password')
if(!checkuser){
    throw new CustomApiError(
        501,
        'Unable to create the user please try agian later!'
    )
}
return res.status(200).json(
    new customApiResponse(
        200,
        'User created successfully',
        checkuser
    )
)

})

const loginUser = asyncHandlers(async(req,res)=>{
    res.send('This is a  login User Route')
})

const logoutUser = asyncHandlers(async(req,res)=>{
    res.send('This is a  logout User Route')
})


const refreshAccessTokenandRefreshToken = asyncHandlers(async(req,res)=>{
    res.send('This is  refresh access refersh and access token route!')
})


const changeUserPassword = asyncHandlers(async(req,res)=>{
    res.send('This is change user password route')
})


const changeUserProfilePicture = asyncHandlers(async(req,res)=>{
    res.send('This is user change profile picture route')
})

module.exports ={
    registerUser,  
    loginUser,
    logoutUser,
    refreshAccessTokenandRefreshToken,
    changeUserPassword,
    changeUserProfilePicture,
}