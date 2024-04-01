import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from 'src/core/model/category.model';
import Api from 'twilio/lib/rest/Api';

@ApiTags('category')
@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ){} 

    @Post('/')
    @ApiResponse({type: Category})
    async addCategory(@Body() dto: {categoryName: string}): Promise<Category>{
        return this.categoryService.addCategory(dto.categoryName);
    }

    @Get('/all')
    @ApiResponse({type: [Category]})
    async getAllCategory(): Promise<Category[]>{
        return this.categoryService.getAllCategories()
    }

    @Get(':id')
    @ApiResponse({type: [Category]})
    async getCategoryById(@Param('id') category_id: number): Promise<Category[]>{
        return this.categoryService.getCategoryById(category_id);
    }

}
