import { Sequelize } from "sequelize-typescript"
import dotenv from 'dotenv'
import Presupuestos from "../model/Presupuesto"
import Gastos from "../model/Gastos"
dotenv.config()

export const db = new Sequelize(process.env.DATABASE_URL,{
    models: [Presupuestos,Gastos],
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