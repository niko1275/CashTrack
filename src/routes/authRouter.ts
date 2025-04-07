import { Router } from "express";
import { AuthControlller } from "../controllers/AuthController";
import {body, param} from 'express-validator'

const router = Router()


router.post('/create-account',
    body('nombre').notEmpty().withMessage('Campo Nombre no puede ir vacio'),
    body('password').notEmpty().withMessage('Campo Contraseña no puede ir vacio'),
    body('email').isEmail().withMessage('Campo email no es valido')
    ,AuthControlller.createaccount)

router.post('/confirm-account', body('token').notEmpty().isLength({min:6}).withMessage('Campo token no puede ir vacio'),AuthControlller.confirmAccount)
export default router