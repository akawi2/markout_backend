import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from 'src/core/model/like.model';
import { User } from 'src/core/model/user.model';
import { TokenUtils } from '../auth/token_utiles.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [LikeService, TokenUtils, JwtService],
  controllers: [LikeController],
  imports: [TypeOrmModule.forFeature([
    Like, User
  ])]
})
export class LikeModule {}
