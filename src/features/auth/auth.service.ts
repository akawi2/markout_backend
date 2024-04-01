import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/model/user.model';
import { Repository } from 'typeorm';
import { UserAddDto } from './dto/useradd.dto';
import { PhoneVerification } from 'src/core/model/phoneVerification.model';
import { OtpEmailVerifyDto, OtpPhoneVerifyDto, OtpVerifyDto } from './dto/otpVerify.dto';
import { TwilioService } from './message/twilio.service';
import { CreateVerificationDto, VerificationType } from './dto/createVerificaton.dto';
import { MailVerification } from 'src/core/model/mailVerification.model';
import * as bcrypt from 'bcryptjs';
import { hashConstants } from 'src/shared/constants/hash';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { TokenUtils } from './token_utiles.service';
import { EmailService } from './email/mail.service';
import { LoginResponse } from './reponse/login.response';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(PhoneVerification) private readonly phoneVerificationRepository: Repository<PhoneVerification>,
        @InjectRepository(MailVerification) private readonly mailVerificationRepository: Repository<MailVerification>,
        private readonly twilioService: TwilioService,
        private readonly emailService: EmailService,
        private tokenUtils: TokenUtils,
        private jwtService: JwtService,
        //private readonly mailerService: MailerService,
        ){}

      private generateOtp(length: number): string {
        const characters = '0123456789';
        let otp = '';

        for (let i = 0; i < length; i++) {
            otp += characters[Math.floor(Math.random() * characters.length)];
        }

        return otp;
    }

    async createVerification(dto: CreateVerificationDto){
        if(dto.type == VerificationType.phoneNumber){
            const verify = await this.phoneVerificationRepository.findOne({where:{phoneNumber: dto.field}})
            if(verify){
                const otp = this.generateOtp(6);
                const verification = new OtpPhoneVerifyDto()
                verification.otp = otp
                verification.phoneNumber = dto.field
        
                verify.otp = otp
                const phoneVerification = await this.phoneVerificationRepository.save(verify);
        
                var message = "Hello there : Here is your otp code "+otp
                // send whatsapp message
                this.twilioService.sendWhatsAppMessage(dto.field, message);
                
                return phoneVerification
            }
            else{
                const otp = this.generateOtp(6);
                const verification = new OtpPhoneVerifyDto()
                verification.otp = otp
                verification.phoneNumber = dto.field
        
                const phoneVerification = await this.phoneVerificationRepository.save(verification)
        
                var message = "Hello there : Here is your otp code "+otp
                // send whatsapp message
                this.twilioService.sendWhatsAppMessage(dto.field, message);
                
                return phoneVerification
            }
        
        }
        else if(dto.type == VerificationType.email){
            const verify = await this.mailVerificationRepository.findOne({where:{email: dto.field}})

            if(verify){
                const otp = this.generateOtp(6);
                //const verification = new OtpEmailVerifyDto()
                // verification.otp = otp
                //verification.email = dto.field
                const otpCrypt = bcrypt.hashSync(otp, hashConstants.bcryptSaltOrRounds)
 
                verify.otp = otpCrypt
                const mailVerification = await this.mailVerificationRepository.save(verify);

                const sendMail = this.emailService.sendAuthEmail(dto.field, otp);
                if(!sendMail){
                    throw new HttpException("Mail not sent", HttpStatus.BAD_REQUEST)
                }
                
                return mailVerification 
            }
            else{
                const otp = this.generateOtp(6);
                const verification = new OtpEmailVerifyDto()
                const otpCrypt = bcrypt.hashSync(otp, hashConstants.bcryptSaltOrRounds)
                verification.otp = otpCrypt
                verification.email = dto.field
        
                const mailVerification = await this.mailVerificationRepository.save(verification)
        
                var message = "Hello there : Here is your otp code "+otp

                const sendMail = this.emailService.sendAuthEmail(dto.field, otp);

                  if(!sendMail){
                    throw new HttpException("Mail not sent", HttpStatus.BAD_REQUEST)
                }
                
                return mailVerification
            }

        }
        else{
            throw new HttpException("wrong entry", HttpStatus.BAD_REQUEST);
        }
        
       
    }
    

    async checkOTP(dto: OtpVerifyDto): Promise<boolean>{
        if(dto.type == VerificationType.phoneNumber){
            const phoneOtpTest = await this.phoneVerificationRepository.findOne({where:{phoneNumber: dto.field}})
            // const isOtpValid = await bcrypt.compare(dto.otp, phoneOtpTest.otp);

            if(dto.otp == phoneOtpTest.otp)
            {
                return true
            }
            else{
                return false
            }
        }
        else if(dto.type == VerificationType.email){
            
            const emailOtpTest = await this.mailVerificationRepository.findOne({where:{email: dto.field}})
            const isOtpValid = await bcrypt.compare(dto.otp, emailOtpTest.otp);

            if(isOtpValid)
            {
                return true
            }
            else{
                return false
            }
        }
        else{
            throw new HttpException("Wrong entry data", HttpStatus.BAD_REQUEST)
        }

    }

    async addUser(dto: UserAddDto): Promise<string>{
        const secret = process.env.JWTSECRET
        const user = await this.userRepository.save(dto);
        const token = this.jwtService.sign(user, { secret });

          return token;
      }

      async getUser(user_id: number): Promise<User>{
        const user = await this.userRepository.findOne({where: {id: user_id}})
        return user;
      }


      async login(dto: LoginDto): Promise<LoginResponse>{
        const secret = process.env.JWTSECRET

        if(dto.type==VerificationType.phoneNumber){
            const user = await this.userRepository.findOne({where: {phoneNumber: dto.field, password: dto.password}})
            if(!user){
                throw new HttpException("les information ne sont pas valide", HttpStatus.BAD_REQUEST);
            }
            const payload = {
                id: user.id, 
                username: user.username,
                password: user.password,
                phoneNumber: user.phoneNumber,
                email: user.email,
                created_at: user.created_at
            };

            const token = this.jwtService.sign(payload, { secret });
            const response = new LoginResponse();
            response.username = user.username
            response.email = user.email
            response.phoneNumber = user.phoneNumber
            response.token = token
            return response
            }
        else if(dto.type == VerificationType.email){
            const user = await this.userRepository.findOne({where: {email: dto.field, password: dto.password}});
            if(!user){
                throw new HttpException("les information ne sont pas valide", HttpStatus.BAD_REQUEST);
            }
            const payload = {
                id: user.id, 
                username: user.username,
                password: user.password,
                phoneNumber: user.phoneNumber,
                email: user.email,
                created_at: user.created_at
            };
            const token = this.jwtService.sign(payload, { secret });
            const response = new LoginResponse();
            response.username = user.username
            response.email = user.email
            response.phoneNumber = user.phoneNumber
            response.token = token
            return response
        }
        else{
            throw new HttpException("numero de telephone ou email incorrect", HttpStatus.BAD_REQUEST);
        }
      }

      googleLogin(req){
        if(!req.user){
          return 'No user from google'
        }
        return {
          message: 'User info from Google',
          user: req.user
        }
      }

      async updateUser(token: string, user: UserAddDto): Promise<User>{
        const user_id = await this.tokenUtils.getUserIdFromToken(token)
        if(!user_id){
            throw new HttpException("User is not having a valid account",HttpStatus.BAD_REQUEST)
        }
        const userGet = await this.userRepository.findOne({where: {id: user_id}});
        userGet.email = user.email
        userGet.username = user.username
        userGet.phoneNumber = user.phoneNumber
        userGet.password = user.password

        await this.userRepository.save(userGet);
        return userGet
      }

    async SignOut(token: string): Promise<string>{
        
        return 

    }
      

}
