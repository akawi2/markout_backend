import { IsNotEmpty } from "class-validator";

export class UserAddDto{
    @IsNotEmpty()
    username: string;

    phoneNumber: string;
    
    email: string;
  
    password: string;
}