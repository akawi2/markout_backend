import { Body, Controller, Post, Headers } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Like } from 'src/core/model/like.model';
import { LikeDto } from './dto/like.dto';

@ApiTags('like')
@Controller('like')
export class LikeController {
    constructor(
        private readonly likeService: LikeService
    ){}

    @Post('')
    @ApiResponse({type: Boolean})
    async addLike(@Headers('authorization') authorization: string, 
    @Body() dto: LikeDto): Promise<boolean>{
        return this.likeService.addLike(authorization,dto);
    }
}
