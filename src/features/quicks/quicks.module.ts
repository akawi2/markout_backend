import { Module } from '@nestjs/common';
import { QuicksService } from './quicks.service';
import { QuicksController } from './quicks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quicks } from 'src/core/model/quicks.model';
import { Like } from 'src/core/model/like.model';
import { Expert } from 'src/core/model/expert.model';
import { Comment } from 'src/core/model/comments.model';
import { TokenUtils } from '../auth/token_utiles.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [QuicksService, TokenUtils,JwtService],
  controllers: [QuicksController],
  imports: [TypeOrmModule.forFeature([
    Quicks, Comment, Like, Expert
  ])]
})
export class QuicksModule {}
