import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from 'src/core/model/video.model';
import { Repository } from 'typeorm';

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video) private readonly videoRepository: Repository<Video>
    ){}

    async getVideoByTheme(theme_id: number): Promise<Video[]>{
        const videos = await this.videoRepository.find({where: {theme_id: theme_id }});
        return videos
    }   
}
