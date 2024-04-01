import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Video } from "./video.model";
import { Conference } from "./conference.model";
import { Quicks } from "./quicks.model";
import { ApiProperty } from "@nestjs/swagger";
import { Element_Type } from "./enum/type.enum";
import { User } from "./user.model";

@Entity('Viewed')
export class Viewed{
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    viewed_number: number


    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    @ApiProperty()
    viewed_at: Date;

    @ManyToOne(()=> User)
    @JoinColumn({name : 'user_id'})
    @ApiProperty()
    user_id: number;

    @Column({})
    @ApiProperty()
    element_type: Element_Type

    @Column({})
    @ApiProperty()
    element_id: number

}