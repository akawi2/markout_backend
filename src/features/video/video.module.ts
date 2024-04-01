import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/core/model/video.model';
import { Theme } from 'src/core/model/theme.model';
import { Category } from 'src/core/model/category.model';

@Module({
  providers: [VideoService],
  controllers: [VideoController],
  imports: [TypeOrmModule.forFeature([
    Video, Theme, Category
  ])]

})
export class VideoModule {}
