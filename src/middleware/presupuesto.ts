import type {Request,Response,NextFunction} from 'express'
import { param, validationResult, body } from 'express-validator'
import Presupuestos from '../model/Presupuesto';

declare global {
    namespace Express {
        interface Request{
            presupuesto : Presupuestos
        }
    }
}

export const validatePresupuestoID = async (req:Request,res:Response,next:NextFunction)=>{
    console.log("ID recibido:", req.params.id);
    await param('PresupuestoId').isInt().withMessage('Id No valido')
    .custom(value=> value>0).withMessage('Id No valido, debe ser mayor a 0').run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {  
        res.status(400).json({ errors: errors.array() }); 
        return
    }

    next()
}


export const validatePresupuestoExist= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const {PresupuestoId} = req.params
        const presupuesto = await Presupuestos.findByPk(PresupuestoId)

        if(!presupuesto){
            res.status(404).json({error:'Presupuesto no encontrado'})
            return
        }
        req.presupuesto= presupuesto
        next() 

    }catch(error){
        res.status(500).json({error:'Hubo un error'})
    }
}


export const ValidatePresupuestoInput = async (req:Request,res:Response,next:NextFunction)=>{
    await body('nombre').notEmpty().withMessage('Nombre no puede ir vacio').run(req)
    await body('cantidad').notEmpty().withMessage('La cantidad del presupuesto no puede ser vacia')
    .isNumeric().withMessage('Cantidad no valida')
    .custom(value => value>0).withMessage('Cantidad debe ser mayor a 0').run(req)

   

    next()
}