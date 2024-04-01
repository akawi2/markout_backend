import { Body, Controller, Get, Post, Headers } from '@nestjs/common';
import { QuicksService } from './quicks.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Quicks } from 'src/core/model/quicks.model';
import { QuicksAddDto } from './dto/quicks.dto';
import { QuicksResponse } from './response/quicks.response';

@ApiTags('quicks')
@Controller('quicks')
export class QuicksController {
    constructor(
        private readonly quicksService: QuicksService
    ){}

    @Get('/all')
    @ApiResponse({type: [QuicksResponse]})
    async getAllQuicks(@Headers('authorization') authorization: string): Promise<QuicksResponse[]>{
        return this.quicksService.getAllQuicks(authorization)
    }

    @Post()
    @ApiResponse({type: Quicks})
    async addQuicks(@Body() dto: QuicksAddDto): Promise<Quicks>{
        return this.quicksService.addQuicks(dto);
    }
}
