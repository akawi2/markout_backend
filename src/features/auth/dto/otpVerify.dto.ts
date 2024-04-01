import { IsNotEmpty } from "class-validator";
import { VerificationType } from "./createVerificaton.dto";

export class OtpVerifyDto{

    @IsNotEmpty()
    field: string

    @IsNotEmpty()
    type: VerificationType

    @IsNotEmpty()
    otp: string
}

export class OtpPhoneVerifyDto{

    @IsNotEmpty()
    phoneNumber: string

    @IsNotEmpty()
    otp: string

}

export class OtpEmailVerifyDto{

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    otp: string
}
