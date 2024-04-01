import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/core/model/comments.model';
import { TokenUtils } from '../auth/token_utiles.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/core/model/user.model';

@Module({
  providers: [CommentService, TokenUtils, JwtService],
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([
    Comment, User
  ])] 
})
export class CommentModule {}
