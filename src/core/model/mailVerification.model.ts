import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity('MailVerification')
export class MailVerification{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({unique: true})
    @ApiProperty()
    email: string;

    @Column()
    otp: string

    @Column({default: ()=> "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date
}
