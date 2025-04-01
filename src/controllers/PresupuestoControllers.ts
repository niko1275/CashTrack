import type { Request, Response } from "express"
import Presupuestos from "../model/Presupuesto"
import Gastos from "../model/Gastos"

export class PresupuestoControllers {
    static getAll = async (req:Request,res:Response)=>{
        try{
            const presupuesto = await Presupuestos.findAll({
                order:[
                    ['id','ASC']
                ]

                //TODO Filtrar por usuario autenticado
            })
            res.json(presupuesto)
        }catch(error){
            res.status(500).json({error:'Hubo un error'})
        }
    }

    static create = async (req: Request, res: Response) => {
        try {
            const nuevoPresupuesto = await Presupuestos.create(req.body); 
            res.status(201).json({ message: "Presupuesto Creado Correctamente", presupuesto: nuevoPresupuesto });
        } catch (error) {
            res.status(500).json({ error: "Hubo un error al crear el presupuesto", details: error });
        }
    };
    static actualizar = async (req:Request,res:Response)=>{

            await req.presupuesto.update(req.body)
            res.json('Presupuesto actualizado correctamente')

        
    }

    static buscar = async (req:Request,res:Response)=>{
        const presupuesto = await Presupuestos.findByPk(req.presupuesto.id,{
            include:[Gastos]
        })

        res.json(presupuesto)
    }
    static eliminar = async (req:Request,res:Response)=>{
      

            await req.presupuesto.destroy()
            res.json('Presupuesto eliminado correctamente')

      
    }
}