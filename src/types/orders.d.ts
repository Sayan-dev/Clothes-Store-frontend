import { CartItem } from "./cart";

export interface Order{
    status:string
    amount:number
    createdAt: string
    notes:{
        email:string;
        address: string
    }
    items: CartItem[]
    
}

export type Orders = Order[]