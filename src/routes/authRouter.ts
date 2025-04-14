import { Router } from "express";
import { AuthControlller } from "../controllers/AuthController";
import {body, param} from 'express-validator'
import { limiter } from "../config/limiter";
import { HandleInputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router = Router()


router.post('/create-account',
    body('nombre').notEmpty().withMessage('Campo Nombre no puede ir vacio'),
    body('password').notEmpty().withMessage('Campo Contraseña no puede ir vacio'),
    body('email').isEmail().withMessage('Campo email no es valido')
    ,HandleInputErrors
    ,AuthControlller.createaccount)

router.post('/confirm-account', body('token')
.notEmpty().isLength({min:6}).withMessage('Campo token no puede ir vacio'),
AuthControlller.confirmAccount)

router.post('/login',body('email').isEmail().withMessage("Email No valido"),
body('password').notEmpty().withMessage("Contraseña es obligatorio"),
HandleInputErrors,
AuthControlller.login)

router.post('/restablecer-password',body('email').isEmail().withMessage("Email No valido"),
HandleInputErrors,
AuthControlller.restablerPassword)


router.post('/Validate-token',body('token')
.notEmpty().isLength({min:6}).withMessage('Campo token no puede ir vacio'),
HandleInputErrors,
AuthControlller.restablerPassword)


router.post('/reset-password/:token',param('token')
.notEmpty().isLength({min:6}).withMessage('Campo token no puede ir vacio'),
body('password').notEmpty().withMessage("Contraseña es obligatorio").
isLength({min:8}).withMessage('La contraseña es muy corta, minimo 8 caracteres'),HandleInputErrors,
AuthControlller.ResetPasswordWithToken)


router.get('/user',authenticate,AuthControlller.user)
router.post('/update-password',authenticate,
    body('password').notEmpty().withMessage("Contraseña es obligatorio").
    isLength({min:8}).withMessage('La contraseña es muy corta, minimo 8 caracteres'),
    body('password_confirm').notEmpty().withMessage("Contraseña es obligatorio").
    isLength({min:8}).withMessage('La contraseña nueva es muy corta, minimo 8 caracteres'),
    HandleInputErrors,
    AuthControlller.updatePassword)


router.post('/check-password',authenticate,
    body('password').notEmpty().withMessage("El password actual no puede ir vacio"),
    AuthControlller.checkpassword)



export default router