import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/core/model/comments.model';
import { Repository } from 'typeorm';
import { CommentDto } from './dto/comment.dto';
import { TokenUtils } from '../auth/token_utiles.service';
import { CommentGetDto } from './dto/getComment.dto';
import { CommentGetResponse } from './response/commentGet.response';
import { User } from 'src/core/model/user.model';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>, 
        private tokenUtils : TokenUtils,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async addComment(dto: CommentDto, token: string): Promise<Comment>{

        const user_id = this.tokenUtils.getUserIdFromToken(token);
        const comment = new Comment()
        comment.user_id = user_id
        comment.message = dto.message
        comment.type = dto.type
        comment.element_id = dto.element_id
        
        const commentAdd = await this.commentRepository.save(comment)
        return commentAdd;
    }

    async getComment(dto: CommentGetDto, token : string): Promise<CommentGetResponse[]>{
        const user_id = this.tokenUtils.getUserIdFromToken(token)
        const getComments = await this.commentRepository.find({where: {element_id: dto.element_id, type: dto.type}});
        const response = [];
        const you = false;
        for(let c of getComments){

            const addResponse = new CommentGetResponse()
            addResponse.message = c.message
            const user =  await this.userRepository.findOne({where: {id: c.user_id}})
            if(user){
                addResponse.username = user.username
            }else{
                addResponse.username = "none"
            }
            if(user.id == user_id){
                addResponse.you = true
            }else{
                addResponse.you = false
            }
            response.push(addResponse)

        }
        return response
    }
}
