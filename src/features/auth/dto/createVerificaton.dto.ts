import { IsNotEmpty } from "class-validator"

export class CreateVerificationDto{
    @IsNotEmpty()
    field: string

    type: VerificationType
}

export enum VerificationType{
    email = "EMAIL",
    phoneNumber = "PHONENUMBER"
}