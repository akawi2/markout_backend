import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'src/core/model/like.model';
import { Repository } from 'typeorm';
import { LikeDto } from './dto/like.dto';
import { TokenUtils } from '../auth/token_utiles.service';
import { User } from 'src/core/model/user.model';

@Injectable()
export class LikeService {
    constructor(
        @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
        private tokenUtils: TokenUtils,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}

    async addLike(token: string,dto: LikeDto): Promise<boolean>{
         const user_id = await this.tokenUtils.getUserIdFromToken(token)
        // const user = await this.userRepository.findOne({where : {id: user_id}});
        const likeGet = await this.likeRepository.findOne({where: {user_id: user_id, element_id: dto.element_id, type: dto.type}})
        if(!likeGet && dto.state){
            const like = new Like()
            like.user_id = user_id
            like.type = dto.type
            like.element_id = dto.element_id
    
            await this.likeRepository.save(like);
    
            return true
        }
        else if(likeGet){
            const like = await this.likeRepository.findOne({where: {user_id: user_id, element_id: dto.element_id, type: dto.type}})
            const likeDelete = await this.likeRepository.delete(like.id);
            return false

        }
        else if(!user_id){
            throw new HttpException("No invalid token", HttpStatus.BAD_REQUEST)
        }

        else{
            throw new HttpException("Unknown "+user_id, HttpStatus.BAD_REQUEST)

        }

    }

    
}
