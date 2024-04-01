import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/model/user.model';
import { TwilioService } from './message/twilio.service';
import { PhoneVerification } from 'src/core/model/phoneVerification.model';
import { GoogleStrategy } from './google-auth/google.strategy';
import { JwtService } from '@nestjs/jwt';
import { MailVerification } from 'src/core/model/mailVerification.model';
import { emailModule } from './email/email.module';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailService } from './email/mail.service';
import { TokenUtils } from './token_utiles.service';


@Module({
  providers: [AuthService, TwilioService, GoogleStrategy, JwtService, EmailService, JwtService, TokenUtils],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([
      User, PhoneVerification, MailVerification
    ])
  ]
})
export class AuthModule {}
