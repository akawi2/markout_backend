import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Theme } from "./theme.model";
import { ApiProperty } from "@nestjs/swagger";

@Entity("Videos")
export class Video {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    title: string

    @ManyToOne(() => Theme)
    @JoinColumn({name: "theme_id"})
    @ApiProperty()
    theme_id: number
    
    @Column({default: false})
    @ApiProperty()
    description: string

    @Column()
    @ApiProperty()
    duration: number

    @Column({unique: true})
    @ApiProperty()
    url: string

    @Column({default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date

}
