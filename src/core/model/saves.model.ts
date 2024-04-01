import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";
import { Video } from "./video.model";
import { Conference } from "./conference.model";
import { Quicks } from "./quicks.model";
import { Element_Type } from "./enum/type.enum";

@Entity('save')
export class Save{
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'userId'})
    @ApiProperty()
    user_id: number;

    @ManyToOne(()=> Video)
    @JoinColumn({name : 'element_id'})
    @Column({default: null})
    @ApiProperty()
    element_id: number;

    @ManyToOne(()=> Conference)
    @JoinColumn({name : 'type'})
    @Column({default: null})
    @ApiProperty()
    type: Element_Type

    @Column({default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date;
}
