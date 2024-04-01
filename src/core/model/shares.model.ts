import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";
import { Video } from "./video.model";
import { Conference } from "./conference.model";
import { Quicks } from "./quicks.model";

@Entity()
export class Share{
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'userId'})
    @ApiProperty()
    user_id: number;

    @ManyToOne(()=> Video)
    @JoinColumn({name : 'video_id'})
    @Column({default: null})
    @ApiProperty()
    video_id: number;

    @ManyToOne(()=> Conference)
    @JoinColumn({name : 'conference_id'})
    @Column({default: null})
    @ApiProperty()
    conference_id: number;

    @ManyToOne(()=> Quicks)
    @JoinColumn({name : 'quicks_id'})
    @Column({default: null})
    @ApiProperty()
    quicks_id: number;

    @Column({default: ()=> "CURRENT_TIMESTAMP"})
    @ApiProperty()
    createdAt: Date;
}
