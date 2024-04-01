import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity('Login')
export class Login{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ManyToOne(()=> User)
    @JoinColumn({name : 'userId'})
    @ApiProperty()
    user_id: number;

    @Column()
    token: string

    @Column({default: ()=> "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date
}
