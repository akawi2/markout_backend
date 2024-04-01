import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SwaggerConfiguration } from './core/config/swagger';
// import { CategoryModule } from './features/category/category.module';
// import { ExpertModule } from './features/expert/expert.module';
import { ThemeModule } from './features/theme/theme.module';
// import { QuicksModule } from './features/quicks/quicks.module';
import { Category } from './core/model/category.model';
import { Conference } from './core/model/conference.model';
import { Expert } from './core/model/expert.model';
import { Preference } from './core/model/preference.model';
import { Quicks } from './core/model/quicks.model';
import { Save } from './core/model/saves.model';
import { SharedSubscription } from './core/model/shared_subscription.model.';
import { Share } from './core/model/shares.model';
import { Teaches } from './core/model/teachers.model';
import { Theme } from './core/model/theme.model';
import { User } from './core/model/user.model';
import { Video } from './core/model/video.model';
import { Like } from './core/model/like.model';
import { Comment } from './core/model/comments.model';
import { Subscription } from './core/model/subscription.model';
// import { StreamModule } from './features/video/stream.module';
import { ConfigModule } from '@nestjs/config';
// import { LikeModule } from './features/like/like.module';
// import { SaveModule } from './features/save/save.module';
// import { RateModule } from './features/rate/rate.module';
// import { ConferenceModule } from './features/conference/conference.module';
// import { MessageModule } from './features/message/message.module';
// import { AuthModule } from './features/auth/auth.module';
// import { ThemeModule } from './features/theme/theme.module';
import { ThemeController } from './features/theme/theme.controller';
// import { FeaturesModule } from './features/features.module';
import { AuthModule } from './features/auth/auth.module';
import { QuicksModule } from './features/quicks/quicks.module';
import { ExpertModule } from './features/expert/expert.module';
import { CategoryModule } from './features/category/category.module';
import { LikeModule } from './features/like/like.module';
import { CommentController } from './features/comment/comment.controller';
import { CommentModule } from './features/comment/comment.module';
import { MailVerification } from './core/model/mailVerification.model';
import { MailerModule } from '@nestjs-modules/mailer';
import { JwtModule } from '@nestjs/jwt';
import { VideoModule } from './features/video/video.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 6543,
      password: process.env.PASSWORD,
      username: 'postgres.gflzzcmahxcdjfslrfbv',
      entities: [Category,Conference,Expert,Video,Theme,Preference,Quicks,Teaches,User,Subscription,SharedSubscription,Comment,Share,Like,Save,MailVerification
      ],
      database: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
    JwtModule.register({
      secret: process.env.JWTSECRET,
    }),
     SwaggerConfiguration,
    //  CategoryModule,
    //  ExpertModule,
     ThemeModule,
    //  QuicksModule,
    // StreamModule,
    //  LikeModule,
    //  SaveModule,
    //  RateModule,
    //  ConferenceModule,
    //  MessageModule,
     AuthModule,
    QuicksModule,
    ExpertModule,
    CategoryModule,
    LikeModule,
    CommentModule,
    VideoModule,
 
  ],
  providers: [],
  controllers: [],


})
export class AppModule {}
