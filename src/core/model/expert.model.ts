import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("Expert")
export class Expert{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column({nullable: true})
    image_url : string
    
    @Column()
    expertise: string

    @Column()
    enterprise: string

    @Column({nullable: true})
    years_experience: number

    @Column({})
    description: String

    @Column({default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

}
