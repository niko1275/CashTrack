import { Sequelize } from "sequelize-typescript"
import dotenv from 'dotenv'
import Presupuestos from "../model/Presupuesto"
import Gastos from "../model/Gastos"
import Usuarios from "../model/Usuarios"
dotenv.config()

export const db = new Sequelize(process.env.DATABASE_URL2,{
    models: [Presupuestos,Gastos,Usuarios],
    define:{
        timestamps:false
    },
    dialectOptions:{
        ssl:{
            require:false,
            rejectUnauthorized: false, 
        }
    }
})