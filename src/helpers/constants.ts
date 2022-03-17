import { CompanyDress } from "../types/dress"

const dressTypes = {
    mens: {
        body: {
            left:100,
            top: 68
        },
        legs: {
            left:100,
            top: 162
        },
        shoes: {
            left:110,
            top: 50
        },
        head: {
            left:110,
            top: 50
        }
    },
    womens: {
        body: {
            left:70,
            top: 68,
        },
        legs: {
            left:110,
            top: 50
        },
        shoes: {
            left:110,
            top: 50
        },
        head: {
            left:110,
            top: 50
        }
    },
    kids: {
        body: {
            left:110,
            top: 50
        },
        legs: {
            left:110,
            top: 50
        },
        shoes: {
            left:110,
            top: 50
        },
        head: {
            left:110,
            top: 50
        }
    }

}

const scales = {
    mens: {
        x:0.208,
        y:0.31
    },
    womens: {
        x:0.28,
        y:0.38
    },
    kids: {
        x:0.4,
        y:0.5
    }
}
export function getScale(type: CompanyDress['type']){
    return scales[type]
}
export function getPosition(type: CompanyDress['type'],dressType: CompanyDress['dresstype']){

    return dressTypes[type][dressType]
}