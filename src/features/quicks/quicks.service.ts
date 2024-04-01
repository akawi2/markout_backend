import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quicks } from 'src/core/model/quicks.model';
import { Repository } from 'typeorm';
import { QuicksResponse } from './response/quicks.response';
import { Expert } from 'src/core/model/expert.model';
import { Like } from 'src/core/model/like.model';
import { Element_Type } from 'src/core/model/enum/type.enum';
import { Comment } from 'src/core/model/comments.model';
import { QuicksAddDto } from './dto/quicks.dto';
import { TokenUtils } from '../auth/token_utiles.service';

@Injectable()
export class QuicksService {
    constructor(
        @InjectRepository(Quicks) private readonly quicksRepository: Repository<Quicks>,
        @InjectRepository(Expert) private readonly expertRepository: Repository<Expert>,
        @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
        private tokenUtils: TokenUtils,

    ){}

    async getAllQuicks(token: string): Promise<QuicksResponse[]>{
        const user_id = await this.tokenUtils.getUserIdFromToken(token)

        const quicksGet = await this.quicksRepository.find()
        let quicks=[] 
        const like = await this.likeRepository.findOne({where: {user_id: user_id, type: Element_Type.QUICKS }})
        let likeSend = false
        if(like && token != null){
             likeSend = true
        }
        
        for(var q of quicksGet){
            const likes = await this.likeRepository.find({where: {type: Element_Type.QUICKS, element_id: q.id}})
            const comments = await this.commentRepository.find({where:{type: Element_Type.QUICKS, element_id: q.id}})
            const expert = await this.expertRepository.findOne({where: {id: q.expert}})

            const quicksReponse = new QuicksResponse()
            quicksReponse.id = q.id
            quicksReponse.title = q.title
            quicksReponse.url = q.url
            quicksReponse.description = q.description
            quicksReponse.expert = expert.id
            quicksReponse.expert_image = expert.image_url
            quicksReponse.duration = q.duration
            quicksReponse.created_at = q.created_at
            quicksReponse.like = likes.length ?? 0
            quicksReponse.comment = comments.length ?? 0
            quicksReponse.like_state = likeSend

            quicks.push(quicksReponse)
        }
        return quicks
    }

    async addQuicks(dto: QuicksAddDto): Promise<Quicks>{
        const quickAdd = await this.quicksRepository.save(dto)
        return quickAdd
    }
}
