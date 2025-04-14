import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import Usuarios from "../model/Usuarios";
import bcrypt from 'bcrypt'

declare global {
  namespace Express {
    interface Request {
      user?: Usuarios;
    }
  }
}


export const authenticate = async (req :Request, res:Response,next:NextFunction) => {
    const bearer = req.headers.authorization
 
    if(!bearer){
     res.status(401).json({ error: 'No autorizado' });
     return;
    }
    const [,token] = bearer.split(' ')
    if(!token){
     res.status(401).json({ error: 'Token no valido' });
     return;
    }
   
    try{
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     if(typeof decoded === 'object' && decoded.id){
        req.user = await Usuarios.findByPk(decoded.id)
        next()
     }
    }catch(error){
        res.status(401).json({ error: 'Token inválido' });
    }
}


export const checkPassword = async (password:string,hashedPassword:string) => {
  return await bcrypt.compare(password,hashedPassword)
}
