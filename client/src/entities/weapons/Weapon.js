import Item from '../Item.js';
import { applyChance } from '../../utilities/general/functions/utilityFunctions.js';
class Weapon extends Item {
    constructor(name, description, image, lightDmg, lightAcc, heavyDmg, heavyAcc, critChance) {
        super(name, description, image)
        this.lightDmg = lightDmg;
        this.lightAcc = lightAcc;
        this.heavyDmg = heavyDmg;
        this.heavyAcc = heavyAcc;
        this.critChance = critChance;
    }
    
    Attack(type) {
        let acc = type === 'light' ? this.lightAcc : this.heavyAcc;
        let dmg = type === 'light' ? this.lightDmg : this.heavyDmg;

        if (applyChance(acc)) {
            console.log('hit');
            let crit = applyChance(this.critChance);
            console.log(crit)
            return crit ?  dmg * 2 : dmg;
        } else {
            console.log('miss');
            return 0 
        }
    }
}

export default Weapon;