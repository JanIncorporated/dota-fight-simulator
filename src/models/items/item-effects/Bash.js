import { root } from 'utils/constants';

export class Bash {
  constructor() {
    this.time = 150;
    this.chance = 0.15;
    this.totalCooldown = 230;
    this.damage = 100;
    this.cooldown = 0;
  }

  effect(target, user) {
    if (this.cooldown > 0) {
      root.innerHTML += `<p>${user.name} basher cooldown: ${this.cooldown}</p>`;
    }
    if (Math.random() < this.chance && this.cooldown === 0) {
      target.hp -= this.damage;
      target.timeBeforeAttack = target.as + this.time;
      this.cooldown = this.totalCooldown;
      root.innerHTML += `<p>${target.name} bashed for ${this.time}ms</p>`;
    }
  }
}
