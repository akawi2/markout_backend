import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Theme } from "./theme.model";
import { ApiProperty } from "@nestjs/swagger";
import { Teaches } from "./teachers.model";
import { Expert } from "./expert.model";

@Entity("Quicks")
export class Quicks{

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    title: string

    @Column({nullable: true})
    @ApiProperty()
    description: string

    @Column()
    @ApiProperty()
    duration: number

    @Column({unique: true})
    @ApiProperty()
    url: string

    @ManyToOne(() => Expert) 
    @JoinColumn({ name: "expert_id" })
    @ApiProperty()
    expert: number;

    @Column({default: () => "CURRENT_TIMESTAMP"})
    @ApiProperty()
    created_at: Date

}
