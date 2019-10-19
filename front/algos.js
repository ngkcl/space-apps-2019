
let data = {
    "beef": { ghg: 15.23 },
    "lamb": { ghg: 20.44 },
    "pork": { ghg: 4.62 },
    "chicken": { ghg: 2.33 },
    "salom": { ghg: 4.14 },
    "eggs": { ghg: 2.12 },
    "milk": { ghg: 1.062 },
    "cheese": { ghg: 9.82 }
}

function calculate(food, dis) {
    return data[food].ghg + ((10180 / 6.5) * dis);
}


class FoodCalc {


    constructor() {

    }

    

}