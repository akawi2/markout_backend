import { IsNotEmpty } from "class-validator"
import { VerificationType } from "./createVerificaton.dto"

export class LoginDto {

    @IsNotEmpty()
    field: string

    @IsNotEmpty()
    type: VerificationType

    @IsNotEmpty()
    password: string
}
