import { CompanyDress } from "./dress";

export interface CartItem extends CompanyDress{
    quantity: number;

}
export type CartItems = Record<string,CartItem>