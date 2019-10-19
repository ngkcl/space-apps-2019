import * as kfc from './kfc.json';
import * as fiveGuys from './five-guys.json';
import * as mcDonalds from './mcdonalds.json';

let data = [
    ...kfc.results.map(p => ({...p, name: "KFC"})),
    ...fiveGuys.results.map(p => ({...p, name: "Five Guys"})),
    ...mcDonalds.results.map(p => ({...p, name: "McDonalds"})),
]

export default data;