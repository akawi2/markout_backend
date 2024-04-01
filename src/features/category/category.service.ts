import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/core/model/category.model';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository : Repository<Category>
    ){}

    async addCategory(name: string): Promise<Category>{
        const category = await this.categoryRepository.save({name: name})
        return category
    }

    async getAllCategories(): Promise<Category[]>{
        const categories = await this.categoryRepository.find()
        return categories;
    }

    async getCategoryById(category_id: number): Promise<Category[]>{
        const cats = await this.categoryRepository.find({where: {id: category_id}}); 
        return cats
    }
}
