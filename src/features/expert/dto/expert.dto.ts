import { IsNotEmpty } from "class-validator"

export class AddExpertDto{
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    image_url : string
    
    @IsNotEmpty()
    expertise: string

    enterprise: string

    @IsNotEmpty()
    years_experience: number

    @IsNotEmpty()
   description: String
}