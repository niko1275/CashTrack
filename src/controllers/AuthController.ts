import { Request,Response } from "express";
import Usuarios from "../model/Usuarios";
import { hashPassword } from "../utils/auth";
import { generarToken } from "../utils/token";
import { authEmail } from "../email/AuthEmail";


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
}