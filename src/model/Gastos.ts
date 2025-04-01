import {  Column, DataType, HasMany,BelongsTo, ForeignKey, Table, Model, AllowNull } from "sequelize-typescript";
import Presupuestos from "./Presupuesto";

@Table({
    tableName: 'gastos'
})

class Gastos extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre : string
    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL
    })
    declare cantidad : number

    @BelongsTo(()=> Presupuestos)
    declare presupuesto : Presupuestos

    @ForeignKey(() => Presupuestos)
    declare presupuestoId: number

}


export default Gastos

