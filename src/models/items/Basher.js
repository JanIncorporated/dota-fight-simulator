import { Bash } from './item-effects/Bash';

export const Basher = function() {
  this.damage = 25;
  this.strength = 10;
  this.effect = new Bash();
};
