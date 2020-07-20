import logger from 'loglevel';
import { 
  RANGE, 
  MELEE 
} from 'Utils/constants';

logger.setLevel('info');

export class Bash {
  constructor(range) {
    this.time = 150;
    switch (range) {
      case (MELEE):
    this.chance = 0.25;
      break;
      case (RANGE):
    this.chance = 0.15
      break;
    }
    this.totalCooldown = 230;
    this.damage = 100;
    this.cooldown = 0;
  }

  effect(target, user) {
    if (this.cooldown > 0) {
      logger.info(`${user.name} basher cooldown: ${this.cooldown}`);
    }
    if (Math.random() < this.chance && this.cooldown === 0) {
      target.hp -= this.damage;
      target.timeBeforeAttack = target.as + this.time;
      this.cooldown = this.totalCooldown;
      logger.info(`${target.name} bashed for ${this.time}ms`);
    }
  }
}
