const jwt = require('jsonwebtoken')
const {

    getUsersService,
    registerUserService,
    getUserByIdOrEmailService
} = require('../services/userServices')


const {StatusCodes} = require('http-status-codes')

const CustomError = require('../shared-services/errors')



const registerUserController = async(req, res) => {
    const {username, email, password} = req.body
    if(!username || !email || !password) {
        throw new CustomError.BadRequestError('Data are mendatory')
    }
    const isUserExist = await getUserByIdOrEmailService({email})
    if(isUserExist){
        throw new CustomError.BadRequestError('please provide valid credentials')
    }

    await registerUserService({...req.body})
    res.status(StatusCodes.CREATED).json('Register successfully')
}


const loginUserController = async(req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new CustomError.BadRequestError('Please provide your credentials')
    }
    const isUserExist = await getUserByIdOrEmailService({email})
    if(!isUserExist){
        throw new CustomError('Invalid credentials')
    }
    const isPasswordMatch = isUserExist.comparePassword(password)
    if(!isPasswordMatch){
        throw new CustomError.BadRequestError('Invalid credentials')
    }
    const token = jwt.sign({userId: isUserExist._id, userName: isUserExist.userName}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
    res.status(StatusCodes.OK).json({msg: 'Connected successfully', token : token})
}


const getUsersController = async(req, res) => {
    const users = await getUsersService()
    res.status(StatusCodes.OK).json({users: users})
}


module.exports = {
    registerUserController,
    loginUserController,
    getUsersController
}