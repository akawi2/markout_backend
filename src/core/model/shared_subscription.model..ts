import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";
import { Subscription } from "./subscription.model";

@Entity('SharedSubscription')
export class SharedSubscription{

    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @ManyToOne(()=> Subscription)
    @JoinColumn({name : 'subscription_id'})
    @ApiProperty()
    subscription_id: number;

    @ManyToOne(()=> User)
    @JoinColumn({name : 'user_id'})
    @Column({default: null})
    @ApiProperty()
    user_id: number;


}