import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";
import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "./comments.model";


@Entity("Replies")
export class Replies{
    
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column()
    @ApiProperty()
    message: string

    @Column()
    @ApiProperty()
    status: string

    @ManyToOne(()=> User)
    @JoinColumn({name : 'user_id'})
    @ApiProperty()
    user_id: number;

    @ManyToOne(()=> Comment)
    @JoinColumn({name : 'comment_id'})
    @Column({default: null})
    @ApiProperty()
    comment_id: number;

    @Column({default: ()=> "CURRENT_TIMESTAMP"})
    @ApiProperty()
    createdAt: Date;
}
