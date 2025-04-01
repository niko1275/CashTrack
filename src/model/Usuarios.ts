import { AllowNull, Column, DataType, Model, Table, Unique } from "sequelize-typescript";

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
    declare confirmed: string
    
}