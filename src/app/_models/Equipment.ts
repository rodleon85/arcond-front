import { EqBrand } from "./EqBrand";
import { EqModel } from "./EqModel";
import { EqPower } from "./EqPower";
import { EqType } from "./EqType";

export class Equipment {
    id: number;
    model: EqModel;
    type: EqType;
    brand: EqBrand;
    power: EqPower;

    constructor(id: number, model: EqModel, type: EqType, brand: EqBrand, power: EqPower) {
        this.id = id;
        this.model = model;
        this.type = type;
        this.brand = brand;
        this.power = power;
    }
}

export interface IndexedEquipment extends Equipment {
    index: number;
  }