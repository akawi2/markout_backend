import { IsNotEmpty } from "class-validator";
import { Expert } from "src/core/model/expert.model";

export class QuicksResponse{
    id : number;
    title: string;
    duration: number;
    url: string;
    expert: number;
    expert_image: string;
    comment: number;
    like: number;
    like_state: boolean;
    description: string;
    created_at: Date;
  
}