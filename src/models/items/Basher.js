import { Bash } from './item-effects/Bash';

export class Basher {
  constructor() {
    this.damage = 25;
    this.strength = 10;
    this.effect = new Bash();
  }
}
