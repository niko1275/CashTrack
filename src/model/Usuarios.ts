import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import Presupuestos from "./Presupuesto";

@Table({
    tableName:"Usuarios"
})

class Usuarios extends Model{
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string

    
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(50)
    })
    declare email:string

    @Column({
        type: DataType.STRING(100)
    })
    declare token: string

    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean

    @HasMany(()=> Presupuestos,{
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare presupuestos: Presupuestos[]
}


export default Usuarios