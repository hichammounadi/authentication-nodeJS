const userRouter = require('express').Router()
const {
    registerUserController,
    loginUserController,
    getUsersController

} = require('../controllers/userControllers')
const authenticateUser = require('../middlewares/authentication')



userRouter.post('/register', registerUserController)
userRouter.post('/login', loginUserController)
userRouter.get('/users', authenticateUser,getUsersController)



module.exports = userRouter