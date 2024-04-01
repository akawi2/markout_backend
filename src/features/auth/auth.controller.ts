import { Body, Controller, Get, Param, Patch, Post, Req, UnauthorizedException, UseGuards, Headers, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAddDto } from './dto/useradd.dto';
import { User } from 'src/core/model/user.model';
import { PhoneVerification } from 'src/core/model/phoneVerification.model';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { CreateVerificationDto } from './dto/createVerificaton.dto';
import { OtpPhoneVerifyDto, OtpVerifyDto } from './dto/otpVerify.dto';
import { TokenUtils } from './token_utiles.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './reponse/login.response';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private jwtService: JwtService,
        private token: TokenUtils

    ){}

    @ApiResponse({type: PhoneVerification})
    @Post('/verify')
    async createPhoneVerification(@Body() dto : CreateVerificationDto){
        return this.authService.createVerification( dto);
    }

    @ApiResponse({type: Boolean})
    @Post('/checkOtp')
    async checkOTP(@Body() dto: OtpVerifyDto): Promise<boolean>{
        return this.authService.checkOTP(dto)
    }

    @ApiResponse({type: String})
    @Post('/')
    async addUser(@Body() user: UserAddDto): Promise<string>{
        return this.authService.addUser(user);
    }

    @ApiResponse({type: User})
    @Get('/user/:id')
    async getUSer(@Param('id') id: number): Promise<User>{
        return this.authService.getUser(id)
    }


    @Get()
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req) {}
  
    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async googleAuthRedirect(@Req() req) {
        // return this.authService.googleLogin(req)
      try {

        const cookie = req.user.accessToken.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        if (!data) {
          throw new UnauthorizedException();
        }
        console.log(req);
        return this.authService.googleLogin(req);
      } catch (e) {
        console.log(req);
        throw new UnauthorizedException(e);
      }
    }
  
    @Get('google/callback/logout')
    @UseGuards(AuthGuard('google'))
    async googlelogout(@Req() req) {
      req.logout();
    }

    @Get('/show/:token')
    async show(@Param('token') token: string){
      return this.token.show(token)
    }

    @Post('/login')
    @ApiResponse({type: LoginResponse})
    async login(@Body() dto: LoginDto): Promise<LoginResponse>{
      return this.authService.login(dto);
    }

    @Patch()
    @ApiResponse({type: User})
    async modifyUser(@Body() dto: UserAddDto, @Headers('authorization') authorization: string): Promise<User>{
        return this.authService.updateUser(authorization,dto);
    }

    @Delete('logout')
    @ApiResponse({type: String})
    async signOut(@Headers('authorization') authorization: string,): Promise<string>{
        return this.authService.SignOut(authorization);
    }
}
