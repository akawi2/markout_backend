import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Theme } from "./theme.model";
import { Expert } from "./expert.model";
import { ApiProperty } from "@nestjs/swagger";

@Entity("Conference")
export class Conference{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    name: string

    @Column()
    @ApiProperty()
    duration: number
    
    @Column()
    @ApiProperty()
    description: string

    @Column()
    @ApiProperty()
    url: string

    @ManyToOne(()=> Expert)
    @JoinColumn({name: "id"})
    @ApiProperty()
    expert_id: number

    @Column({type: Date})
    @ApiProperty()
    starts_at: Date

    @Column({default: ()=> "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date

}


