import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { Theme } from 'src/core/model/theme.model';
import { ThemeDto } from './dto/theme.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseCourse } from './response/responseCourse.response';

@ApiTags('theme')
@Controller('theme')
export class ThemeController {
    constructor(
        private readonly themeService: ThemeService
    ){}

    @ApiResponse({type: Theme})
    @Post()
    async addTheme(@Body() dto: ThemeDto): Promise<Theme>{
        return this.themeService.addTheme(dto);
    }

    @ApiResponse({type: [Theme]})
    @Get("/all")
    async getAllThemes(): Promise<ResponseCourse[]>{
        return this.themeService.getAllThemes()
    }

    @Get('/new')
    @ApiResponse({type: [ResponseCourse]})
    async newThemes(): Promise<ResponseCourse[]>{
        return this.themeService.LastProgram()
    }

    @Get('recommendation')
    @ApiResponse({})
    async getRecommendation(
        @Headers('authorization') authorization: string
      // @Param('token') authorization: string
       ): Promise<ResponseCourse>{
        return this.themeService.Recommendation(authorization);
    }
    
    @Get('/teaches')
    async getTeaches(){
        return this.themeService.getTeaches()
    }
}
