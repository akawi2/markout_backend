import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";

@Entity("Subscription")
export class Subscription{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'userId'})
    @ApiProperty()
    user_id: number;

    @Column()
    @ApiProperty()
    type: string

    @Column()
    @ApiProperty()
    payment_mode: string
    
    @Column({default: ()=> "CURRENT_TIMESTAMP"})
    @ApiProperty()
    create_at: Date

    @Column({default: ()=> "CURRENT_TIMESTAMP"})
    @ApiProperty()
    end_at: Date

}
