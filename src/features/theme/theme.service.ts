import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expert } from 'src/core/model/expert.model';
import { Theme } from 'src/core/model/theme.model';
import { MoreThan, Repository } from 'typeorm';
import { ThemeDto } from './dto/theme.dto';
import { ResponseCourse } from './response/responseCourse.response';
import { Viewed } from 'src/core/model/viewed.model';
import { Element_Type } from 'src/core/model/enum/type.enum';
import { Rate } from 'src/core/model/rate.dto';
import { TokenUtils } from '../auth/token_utiles.service';
import { Category } from 'src/core/model/category.model';
import { Teaches } from 'src/core/model/teachers.model';
import exp from 'constants';

@Injectable()
export class ThemeService {
    constructor(
        @InjectRepository(Theme) private readonly themeRepository: Repository<Theme>,
        @InjectRepository(Expert) private readonly expertRepository: Repository<Expert>,
        @InjectRepository(Viewed) private readonly viewRepository: Repository<Viewed>,
        @InjectRepository(Rate) private readonly rateRepository: Repository<Rate>,
        private tokenUtilService : TokenUtils,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Teaches) private readonly teachesRepository: Repository<Teaches>,
        
    ){}

    async addTheme(dto: ThemeDto): Promise<Theme>{
        const expertTest = await this.expertRepository.findOne({where: {id: dto.expert_id}})
        if(expertTest){
            return await this.themeRepository.save(dto)
         }
         else{
            throw new HttpException("Expert doesn't exist", HttpStatus.BAD_REQUEST);
         }
    }

    async getAllThemes(): Promise<ResponseCourse[]>
    {
        const themes = await this.themeRepository.find({order: { created_at: 'DESC' }, where :{id : MoreThan(0)} })
        let SendTheme = []
    

        for(var theme of themes){
        let av_rate = 0;
        let count = 0;
        let sum_count = 0;
        let send_views = 0;

        const rate = await this.rateRepository.find({where: {theme_id: theme.id}});
        const views = await this.viewRepository.find({where: {element_type: Element_Type.THEME, element_id: theme.id}})
    

        for(var i of rate){
            sum_count = i.number
            count ++
        }

        if(sum_count == 0 ){
            av_rate = 0;
        }else{
            av_rate = sum_count/count
        }
        const expert = await this.expertRepository.findOne({where: {id: theme.expert_id }});
        const teaches = await this.teachesRepository.findOne({where: {theme_id: theme.id}})
        const category = await this.categoryRepository.findOne({where: {id: theme.category_id}})
        console.log(theme)
        console.log(teaches)
        console.log(category)

        send_views = views.length
        const themeRecommended = new ResponseCourse();
        themeRecommended.id = theme.id
        themeRecommended.cover_url = theme.cover_url
        themeRecommended.title = theme.name
        themeRecommended.video_number = theme.video_number
        themeRecommended.expert_id = expert.id
        themeRecommended.expert_name = expert.name
        themeRecommended.category_id = theme.category_id
        themeRecommended.category_name = category.name
        themeRecommended.description = theme.description
        themeRecommended.created_at = theme.created_at
        themeRecommended.views = send_views
        themeRecommended.rate = av_rate

        SendTheme.push(themeRecommended);
        }
        return SendTheme
    }


    async Recommendation(token: string): Promise<ResponseCourse>{
        let av_rate = 0;
        let count = 0;
        let sum_count = 0;
        let send_views = 0;
        const themeFind = await this.themeRepository.find()
        const themeRecommended = new ResponseCourse();

        if(themeFind.length == 0){
            return themeRecommended
        }
        const theme = await this.themeRepository//.findOne({where: {id: 1}})
        .createQueryBuilder('theme')
        .orderBy('theme.created_at', 'DESC')
        .where('theme.id > :id', { id: 0 })
        .getOne();        
        const rate = await this.rateRepository.find();
        const views = await this.viewRepository.find()
        //element_type: Element_Type.THEME, element_id: theme.id


        for(var i of rate){
            sum_count = i.number
            count ++
        }

        if(sum_count == 0 ){
            av_rate = 0;
        }else{
            av_rate = sum_count/count
        }
        const expert = await this.expertRepository.findOne({where: {id: theme.expert_id }});
        const teaches = await this.teachesRepository.findOne({where: {id: 1}})
        const category = await this.categoryRepository.findOne({where: {id: theme.category_id}})
        console.log(theme)
        console.log(teaches)
        console.log(category)

        send_views = views.length
        themeRecommended.id = theme.id
        themeRecommended.cover_url = theme.cover_url
        themeRecommended.title = theme.name
        themeRecommended.video_number = theme.video_number
        themeRecommended.expert_id = expert.id
        themeRecommended.expert_name = expert.name
        themeRecommended.category_id = theme.category_id
        themeRecommended.category_name = category.name
        themeRecommended.description = theme.description
        themeRecommended.created_at = theme.created_at
        themeRecommended.views = send_views
        themeRecommended.rate = av_rate


        return themeRecommended;

    }

    async LastProgram(): Promise<ResponseCourse[]>{
        const themes = await this.themeRepository.find({order: { created_at: 'DESC' }, where :{id : MoreThan(0)} })
        let listTheme = []
        let SendTheme = []
        
        for(let i=0; i<5; i++){
         try{
            listTheme.push(themes[i]);
        }catch(e){
            break;
        }
        }

        for(var theme of themes){
        let av_rate = 0;
        let count = 0;
        let sum_count = 0;
        let send_views = 0;

        const rate = await this.rateRepository.find({where: {theme_id: theme.id}});
        const views = await this.viewRepository.find({where: {element_type: Element_Type.THEME, element_id: theme.id}})
    

        for(var i of rate){
            sum_count = i.number
            count ++
        }

        if(sum_count == 0 ){
            av_rate = 0;
        }else{
            av_rate = sum_count/count
        }
        const expert = await this.expertRepository.findOne({where: {id: theme.expert_id }});
        const teaches = await this.teachesRepository.findOne({where: {id: 1}})
        const category = await this.categoryRepository.findOne({where: {id: theme.category_id}})
        send_views = views.length
        const themeRecommended = new ResponseCourse();
        themeRecommended.id = theme.id
        themeRecommended.cover_url = theme.cover_url
        themeRecommended.title = theme.name
        themeRecommended.video_number = theme.video_number
        themeRecommended.expert_id = expert.id
        themeRecommended.expert_name = expert.name
        themeRecommended.category_name = category.name
        themeRecommended.category_id = category.id
        themeRecommended.description = theme.description
        themeRecommended.created_at = theme.created_at
        themeRecommended.views = send_views
        themeRecommended.rate = av_rate

        SendTheme.push(themeRecommended);
        }
        return SendTheme
    }

    async getThemeByCategory(category_id : number): Promise<ResponseCourse[]>{
        const themes = []
        const themesGet = await this.themeRepository.find({where: {}})
        return 
    }

    async getTeaches(){
        const teaches = await this.teachesRepository.find()
        return teaches
    }
}
