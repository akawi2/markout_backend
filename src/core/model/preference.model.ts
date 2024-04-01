import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { Category } from "./category.model";
import { ApiProperty } from "@nestjs/swagger";

@Entity('Preference')
export class Preference{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ManyToOne(()=> User)
    @JoinColumn({name: 'user_id'})
    @ApiProperty()
    user_id: number

    @ManyToOne(()=> Category)
    @JoinColumn({name: 'category_id'})
    @ApiProperty()
    category_id: number
    
}