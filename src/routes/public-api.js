import express from 'express';
import userController from '../controllers/user-controller.js';


const publicRouter = new express.Router()

publicRouter.post('/api/users', userController.registration)
publicRouter.post('/api/users/login', userController.login)


export {
    publicRouter
}