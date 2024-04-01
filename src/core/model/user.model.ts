import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Collection, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('User')
@Unique(['phoneNumber', 'email'])
export class User {

  @PrimaryGeneratedColumn({type:'integer'})
  @ApiProperty()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @ApiProperty()
  username: string;

  @Column({ type: 'varchar', length: 40, default: false, nullable: true})
  @ApiProperty()
  phoneNumber: string;
  
  @ApiProperty()
  @Column({ type: 'varchar', nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty()
  password: string;

  @Column({default: () => "CURRENT_TIMESTAMP"})
  @ApiProperty()
  created_at: Date;

}
