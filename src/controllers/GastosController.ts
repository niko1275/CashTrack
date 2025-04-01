import type { Request, Response } from 'express'
import Gastos from '../model/Gastos'
import Presupuestos from '../model/Presupuesto'



export class GastosController {
    static getAll = async (req: Request, res: Response) => {
        

        const presupuesto = await Presupuestos.findByPk(req.params.PresupuestoId,{
            include:[Gastos]
        })

        res.json(presupuesto)
    }
  
    static create = async (req: Request, res: Response) => {
    try{
        const gasto = new Gastos(req.body)
        gasto.presupuestoId = Number(req.params.PresupuestoId);
        await gasto.save()
        res.status(201).json('Gasto guardado correctamente')
     }catch(error){
        res.status(404).json({error:'Hubo Un eror'})
     } 

    }
  
    static getById = async (req: Request, res: Response) => {
        res.json(req.gasto)   
    }

    static updateById = async (req: Request, res: Response) => {
        await req.gasto.update(req.body)
        res.json("Registro actualizado correctamente")
    }
  
    static deleteById = async (req: Request, res: Response) => {
        await req.gasto.destroy()
        res.json("Registro eliminado correctamente")
    }
}