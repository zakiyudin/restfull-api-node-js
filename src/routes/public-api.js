import express from 'express';
import userController from '../controllers/user-controller.js';


const publicRouter = express.Router()

publicRouter.post('api/users', userController.registration)


export {
    publicRouter
}