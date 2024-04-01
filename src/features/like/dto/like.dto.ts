import { Element_Type } from "src/core/model/enum/type.enum";

export class LikeDto{
    state: boolean;
    
    element_id: number;
    
    type: Element_Type
}