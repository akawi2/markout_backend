import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Expert } from "./expert.model";
import { Category } from "./category.model";
import { ApiProperty } from "@nestjs/swagger";
import { Theme } from "./theme.model";

@Entity("Teaches")
export class Teaches {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @ManyToOne(()=> Expert)
  @JoinColumn({name: 'expert_id'})
  @ApiProperty()
  expert_id: number

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  @ApiProperty()
  category_id: number;

  @ManyToOne(() => Theme) // Add this relation for the "theme" property
  @JoinColumn({ name: 'theme_id' })
  @ApiProperty()
  theme_id: number;
    
}