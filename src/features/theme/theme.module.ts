import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from 'src/core/model/theme.model';
import { Expert } from 'src/core/model/expert.model';
import { Rate } from 'src/core/model/rate.dto';
import { Viewed } from 'src/core/model/viewed.model';
import { TokenUtils } from '../auth/token_utiles.service';
import { JwtService } from '@nestjs/jwt';
import { Category } from 'src/core/model/category.model';
import { Teaches } from 'src/core/model/teachers.model';

@Module({
  providers: [ThemeService, TokenUtils, JwtService],
  controllers: [ThemeController],
  imports: [
    TypeOrmModule.forFeature([
      Theme, Expert, Viewed,Rate, Category, Teaches
    ])
  ]
})
export class ThemeModule {}
