export interface CompanyDress {
    image: string;
    name: string;
    price: number;
    type: 'mens'| 'womens' |'kids';
    dresstype: 'body' | 'legs' | 'head' | 'shoes';
    _id: string;
}

export type CompanyDressObject = Record<string,CompanyDress>