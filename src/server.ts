import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import router from './routes/PresupuestosRoutes'
async function connectDB(){
    try{
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('conexion exitosa a la BD'))
    }catch(error){
        console.log(colors.red.bold('Fallo la conexion a la BD'))
    }
}

connectDB()
const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/presupuesto',router)

export default app