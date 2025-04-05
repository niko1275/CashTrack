import { Request,Response } from "express";
import Usuarios from "../model/Usuarios";


export class AuthControlller {


    static createaccount = async (req: Request, res: Response) => {
        const {email} = req.body
        const userExist = await Usuarios.findOne({where:{email}})
        if(userExist){
            const error = new Error('Usuario ya existe')
            return res.status(409).json({error:error.message})
        }

        try{
            const Usuario = await Usuarios.create(req.body)
            await Usuario.save()
            res.status(404).json('Usuario Creado Correctamente')
         }catch(error){
            res.status(404).json({error:'Hubo Un eror'})
         } 
    }
}