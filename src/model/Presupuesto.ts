import {  Column, DataType, HasMany,BelongsTo, ForeignKey, Table, Model } from "sequelize-typescript";
import Gastos from "./Gastos";
import Usuarios from "./Usuarios";

@Table({
    tableName: 'Presupuestos'
})

class Presupuestos extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre : string

    @Column({
        type: DataType.DECIMAL
    })
    declare cantidad : number

    @HasMany(()=>Gastos,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    })
    declare gastos: Gastos[]

    @ForeignKey(()=>Usuarios)
    declare userId: number

    @BelongsTo(()=> Usuarios)
    declare user: Usuarios
}


export default Presupuestos
