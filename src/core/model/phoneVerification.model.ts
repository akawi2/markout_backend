import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

@Entity('PhoneVerification')
export class PhoneVerification{
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({unique: true})
    @ApiProperty()
    phoneNumber: string;

    @Column()
    otp: string

    @Column({default: ()=> "CURRENT_TIMESTAMP" })
    @ApiProperty()
    created_at: Date
}
