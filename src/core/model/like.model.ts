import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";
import { Video } from "./video.model";
import { Conference } from "./conference.model";
import { Quicks } from "./quicks.model";
import { Element_Type } from "./enum/type.enum";

@Entity("Like")
export class Like{
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'user_id'})
    @Column({unique: true})
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
var date_now =  new Date()