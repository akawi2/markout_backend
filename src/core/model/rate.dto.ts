import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";
import { Video } from "./video.model";
import { Conference } from "./conference.model";
import { Quicks } from "./quicks.model";
import { Element_Type } from "./enum/type.enum";
import { Theme } from "./theme.model";

@Entity('Rate')
export class Rate{
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'user_id'})
    @ApiProperty()
    user_id: number;

    @ManyToOne(()=> Theme)
    @JoinColumn({name : 'theme_id'})
    @Column({default: null})
    @ApiProperty()
    theme_id: number;

    @Column({default: null})
    @ApiProperty()
    number: number 

    @Column({default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date;
}
