import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/core/model/category.model';

@Module({
  providers: [CategoryService],
  controllers: [CategoryController],
  imports: [
    TypeOrmModule.forFeature([
      Category
    ])
  ]
})
export class CategoryModule {}
