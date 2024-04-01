import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";
import { Element_Type } from "./enum/type.enum";

@Entity('Comment')
export class Comment{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    message: string

    @ManyToOne(()=> User)
    @JoinColumn({name : 'id'})
    @ApiProperty()
    user_id: number;
    
    @Column({})
    @ApiProperty({})
    element_id: number;

    @Column({})
    @ApiProperty({enum: Element_Type})
    type: Element_Type

    @Column({default: ()=>"CURRENT_TIMESTAMP"})
    @ApiProperty()
    createdAt: Date;
}
