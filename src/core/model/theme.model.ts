import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Expert } from "./expert.model";
import { ApiProperty } from "@nestjs/swagger";
import { Category } from "./category.model";

@Entity("Theme")
export class Theme{
  
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    name: string 
    
    @Column({nullable: true})
    @ApiProperty()
    cover_url: string

    @Column({nullable: true})
    @ApiProperty()
    duration: number

    @Column({nullable: true})
    @ApiProperty()
    video_number: number

    @ManyToOne(()=> Expert)
    @JoinColumn({name: 'expert_id'})
    @ApiProperty()
    expert_id: number

    @ManyToOne(() => Category)
    @JoinColumn({ name: 'category_id' })
    @ApiProperty()
    category_id: number;

    @Column()
    @ApiProperty()
    description: string 

    @Column({default: () => "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date

}
