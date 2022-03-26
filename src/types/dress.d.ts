export interface CompanyDress {
    image: string;
    name: string;
    price: number;
    isSelected?: boolean;
    type: 'mens'| 'womens' |'kids';
    dresstype: 'body' | 'legs' | 'head' | 'shoes';
    _id: string;
}

export type CompanyDressObject = Record<string,CompanyDress>

export interface UserCollectionDress {
    _id: string
    name:string,
    image: string,
    createdAt:{type:Date},
    price: number,
    type: CompanyDress['type'],
    canvas_obj_ref: CompanyDress[],
    canvas_meta_data: string,
    canvas_json:string,
    userId:string
}