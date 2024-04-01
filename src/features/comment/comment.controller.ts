import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentDto } from './dto/comment.dto';
import { Comment } from 'src/core/model/comments.model';
import { CommentGetResponse } from './response/commentGet.response';
import { CommentGetDto } from './dto/getComment.dto';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(
        private readonly commentService: CommentService
    ){}

    @Post()
    @ApiResponse({type: Comment})
    async addComment(@Body() dto: CommentDto, @Headers('authorization') authorization: string): Promise<Comment>{
        return this.commentService.addComment(dto, authorization)
    }

    @Get()
    @ApiResponse({type: CommentGetResponse})
    async GetComment(@Headers('authorization') authorization: string, @Body() dto: CommentGetDto){
        return this.commentService.getComment(dto, authorization);
    }
}

