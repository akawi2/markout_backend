import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ObjectId, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("Category")
export class Category{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({unique: true})
    @ApiProperty()
    name: string 

    @Column({default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date


}

