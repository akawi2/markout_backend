import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expert } from 'src/core/model/expert.model';
import { Repository } from 'typeorm';
import { AddExpertDto } from './dto/expert.dto';

@Injectable()
export class ExpertService {
    constructor(
        @InjectRepository(Expert) private readonly expertRepository: Repository<Expert>
    ){}

    async addExpert(dto: AddExpertDto): Promise<Expert>{
        const expert = await this.expertRepository.save(dto)
        return expert
    }

    async getAllExpert(): Promise<Expert[]>{
        const experts = await this.expertRepository.find()
        return experts
    }
}
