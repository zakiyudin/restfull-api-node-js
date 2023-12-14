import express from 'express'
import { authMiddleware } from '../middleware/auth-middleware.js'
import userController from '../controllers/user-controller.js'


const userRouter = new express.Router()
userRouter.use(authMiddleware)
userRouter.get('/api/users/current', userController.getUsername)
userRouter.patch('/api/users/current', userController.update)
userRouter.delete('/api/users/logout', userController.logout)

export {
    userRouter
}