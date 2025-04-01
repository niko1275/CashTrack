import { NextFunction ,Request, Response} from "express"
import { body, param } from "express-validator"
import Gastos from "../model/Gastos"

declare global {
    namespace Express {
        interface Request{
            gasto : Gastos
        }
    }
}


export const ValidateGastosInput = async (req:Request,res:Response,next:NextFunction)=>{
    await body('nombre').notEmpty().withMessage('Nombre no puede ir vacio').run(req)
    await body('cantidad').notEmpty().withMessage('La cantidad del Gasto no puede ser vacia')
    .isNumeric().withMessage('Cantidad no valida')
    .custom(value => value>0).withMessage('Cantidad debe ser mayor a 0').run(req)

   

    next()
}

export const validateGastosId = async (req:Request,res:Response,next:NextFunction)=>{
    param('gastosId').isInt().withMessage('Id Gasto No valido')
    .custom(value => value>0).withMessage('Cantidad debe ser mayor a 0').run(req)

    next()

}


export const validateGastoExist = async (req:Request,res:Response,next:NextFunction)=>{

try{
    const {gastosId} = req.params
    const gasto = await Gastos.findByPk(gastosId)

    if(!gasto){
        res.status(404).json({error:'gasto no encontrado'})
        return
    }
    req.gasto= gasto
     
    next()

}catch(error){
    res.status(500).json({error:'Hubo un error'})
}
}