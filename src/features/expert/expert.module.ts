import { Module } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { ExpertController } from './expert.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expert } from 'src/core/model/expert.model';

@Module({
  providers: [ExpertService],
  controllers: [ExpertController],
  imports: [
    TypeOrmModule.forFeature([
      Expert
    ])
  ]
})
export class ExpertModule {}
