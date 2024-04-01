import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from 'src/core/model/video.model';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('video')
@Controller('video')
export class VideoController {
    constructor(
        private readonly videoService: VideoService
    ){}

    @Get('/theme')
    @ApiResponse({type: Video})
    async getVideoByTheme(@Body() id: number): Promise<Video[]>{
        return this.videoService.getVideoByTheme(id);
    }
}
