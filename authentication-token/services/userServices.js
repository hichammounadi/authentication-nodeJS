const User = require('../models/userModel')


const registerUserService = (data) => {
    return User.create(data)
}

const getUserByIdOrEmailService = (data) => {
    return User.findOne(data)
}

const getUsersService = () => {
    return User.find()
}


module.exports = {
    registerUserService,
    getUserByIdOrEmailService,
    getUsersService
}