import logger from 'loglevel';
import {
  hpForStrength,
  STRENGTH,
  AGILITY,
  INTELLIGENCE,
  armorForAgility,
  asForAgility,
} from 'Utils/constants';

logger.setLevel('info');

export class Hero {
  constructor({
    name,
    baseAttr,
    hp = 200,
    stats,
    initialDamage,
    initialArmor,
    asOptions,
    level,
    statsPerLevel,
    items = [],
  }) {
    this.name = name;
    this.baseAttr = baseAttr;
    this.hp = hp;
    this.stats = stats;
    this.asOptions = asOptions;
    this.level = level;
    this.statsPerLevel = statsPerLevel;

    this.baseDamage = 0;
    this.additionalDamage = 0;

    this.baseArmor = 0;
    this.additionalArmor = 0;

    this.effects = [];
    this.items = items;
    this.incAs = 0;

    this.initLevels();
    this.initItems();
    this.initStats();
    this.initAs(asOptions);
    this.initDamage(initialDamage);
    this.initArmor(initialArmor);
  }

  initLevels() {
    this.stats.s += this.statsPerLevel.s * (this.level - 1);
    this.stats.a += this.statsPerLevel.a * (this.level - 1);
    this.stats.i += this.statsPerLevel.a * (this.level - 1);
  }

  initItems() {
    this.items.forEach((item) => {
      if (item) {
        if (item.strength) {
          this.stats.s += item.strength;
        }
        if (item.agility) {
          this.stats.a += item.agility;
        }
        if (item.damage) {
          this.additionalDamage += item.damage;
        }
        if (item.as) {
          this.incAs += item.as;
        }
        if (item.armor) {
          this.additionalArmor += item.armor;
        }
      }
    });
  }

  initDamage(initDamage) {
    this.damage = initDamage + this.baseDamage + this.additionalDamage;
  }

  initArmor(initArmor) {
    this.armor = initArmor + this.baseArmor + this.additionalArmor;
  }

  initStats() {
    this.hp += Math.floor(this.stats.s) * hpForStrength;
    this.incAs += Math.floor(this.stats.a) * asForAgility;
    this.baseArmor += parseFloat((this.stats.a * armorForAgility).toFixed(1));

    switch (this.baseAttr) {
      case STRENGTH:
        this.baseDamage += Math.floor(this.stats.s);
        break;
      case AGILITY:
        this.baseDamage += Math.floor(this.stats.a);
        break;
      case INTELLIGENCE:
        this.baseDamage += Math.floor(this.stats.i);
        break;
      default:
        break;
    }
  }

  initAs(asOptions) {
    const { baseAs, initAs } = asOptions;

    this.as = Math.round((baseAs * 100) / ((initAs + this.incAs) * 0.01));
    this.timeBeforeAttack = this.as;
  }

  // getAttackSpeed() {
  //   return this.attackSpeed + this.attackDeley;
  // }

  attack(target) {
    logger.info(`${this.name} attacks ${target.name}`);
    this.timeBeforeAttack = this.as;

    this.items.forEach(({ effect }) => {
      if (effect) {
        effect.effect(target, this);
      }
    });
    target.hp = Math.round(target.hp - this.damage * (1 - target.getResist()));
  }

  getResist() {
    return (this.armor * 0.06) / (1 + this.armor * 0.06);
  }

  

  reduceTimeBeforeAttack() {
    this.timeBeforeAttack -= 1;

    this.items.forEach(({ effect }) => {
      if (effect) {
        if (effect.cooldown > 0) {
          effect.cooldown -= 1;
        }
      }
    });
  }

  log() {
    logger.info(`${this.name} (${this.damage}): ${this.hp}`);
  }
}
