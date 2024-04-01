import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Expert } from 'src/core/model/expert.model';
import { AddExpertDto } from './dto/expert.dto';

@ApiTags('expert')
@Controller('expert')
export class ExpertController {
    constructor(
        private readonly expertService: ExpertService
    ){}
    
    @Post('')
    @ApiResponse({type: Expert})
    async addExpert(@Body() dto: AddExpertDto): Promise<Expert>{
        return this.expertService.addExpert(dto)
    }
    
    @Get('/all')
    @ApiResponse({type: [Expert]})
    async getAllExpert(): Promise<Expert[]>{
        return this.expertService.getAllExpert()
    }
}
