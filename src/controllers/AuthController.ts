import { Request,Response } from "express";
import Usuarios from "../model/Usuarios";
import { checkPassword, hashPassword } from "../utils/auth";
import { generarToken } from "../utils/token";
import { authEmail } from "../email/AuthEmail";
import { generarJWT } from "../utils/jwt";
import { param } from "express-validator";
import jwt from 'jsonwebtoken'

export class AuthControlller {


    static createaccount = async (req: Request, res: Response):Promise<void> => {
        const {email,password} = req.body
        const userExist = await Usuarios.findOne({where:{email}})
        if (userExist) {
            res.status(409).json({ error: 'Usuario ya existe' });
            return;
          }

        try{
            const Usuario = await Usuarios.create(req.body)
            Usuario.password = await hashPassword(password)
            Usuario.token = generarToken()
            await Usuario.save()

            authEmail.sendConfirmationemail({
                name:Usuario.nombre,
                email:Usuario.email,
                token:Usuario.token
            })

            res.status(201).json('Usuario Creado Correctamente')
         }catch(error){
            res.status(404).json({error:'Hubo Un eror'})
         } 
    }


    static confirmAccount = async (req: Request, res: Response):Promise<void> => {
        const {token} = req.body
        const user = await Usuarios.findOne({
            where:{
                token
            }
        })
        if(!user){
            res.status(409).json({ error: 'Token No valido' });
            return;
        }

        user.confirmed = true
        user.token=""
        await user.save()
        res.status(201).json("Cuenta Confirmada correctamente")

        return
    }


    static login = async (req: Request, res: Response):Promise<void> => {
        const {email,password} = req.body
        const user = await Usuarios.findOne({where:{
            email
        }})
        if(!user){
            res.status(404).json({ error: 'Usuario No encontrado' });
            return;
        }

        if(!user.confirmed){
            res.status(403).json({ error: 'La cuenta no ha sido confirmada' });
            return;
        }

        
        const isCorrect = await checkPassword(password,user.password)

        if(!isCorrect){
            res.status(401).json({ error: 'Password Incorrecta' });
            return;
        }

        
        const token = generarJWT(user.id)

        res.json(token)

    }

    static restablerPassword = async (req: Request, res: Response):Promise<void> => {
        const {email,password} = req.body
        const user = await Usuarios.findOne({where:{
            email
        }})

        if(!user){
            res.status(404).json({ error: 'Usuario No encontrado' });
            return;
        }

        user.token =  generarToken()
        await user.save()


        await authEmail.sendPasswordResetToken({
            name: user.nombre,
            email: user.email,
            token: user.token
        })

        res.json("Revisa tu email para las instrucciones")
    }


    static ValidateToken  = async (req: Request, res: Response):Promise<void> => {
        const {token} = req.body
        const user = await Usuarios.findOne({where:{
            token
        }})

        if(!user){
            res.status(404).json({ error: 'Token No valido' });
            return;
        }
        await user.save()
    

        res.json(token)
    }

    static ResetPasswordWithToken  = async (req: Request, res: Response):Promise<void> => {
        const {token} = req.params
        const {password} = req.body
        const user = await Usuarios.findOne({where:{
            token
        }})
        if(!user){
            res.status(404).json({ error: 'Token No valido' });
            return;
        }
        user.password = await hashPassword(password)
        user.token = null
        user.save()

        res.json("El password se modifico correctamente")
    }

    static user  = async (req: Request, res: Response) => {
   
        res.json(req.user);
     }


     static updatePassword = async (req: Request, res: Response) => {
        const {password,password_confirm} = req.body
        const {id} = req.user
        const user = await Usuarios.findByPk(id)
        const isCorrectPassword = await checkPassword(password,user.password)
        if(!isCorrectPassword){
            res.status(404).json({ error: 'Password actual no es correcto' });
            return;
        }
        user.password = await hashPassword(password_confirm)
        await user.save()
        res.json("El password se modifico correctamente")
     }

     static checkpassword = async (req: Request, res: Response) => {
        const {password} = req.body
        const {id} = req.user
        const user = await Usuarios.findByPk(id)
        const isCorrectPassword = await checkPassword(password,user.password)
        if(!isCorrectPassword){
            res.status(404).json({ error: 'Password actual no es correcto' });
            return;
        }
       
        res.json("password Correcto")
     }
}   
