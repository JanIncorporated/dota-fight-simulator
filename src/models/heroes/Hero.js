import {
  hpForStrength,
  STRENGTH,
  AGILITY,
  INTELLIGENCE,
  armorForAgility,
  asForAgility,
  root,
} from 'utils/constants';

export class Hero {
  constructor({
    name,
    baseAttr,
    hp = 200,
    stats,
    baseDamage,
    baseArmor,
    asOptions,
    level,
    statsPerLevel,
    items = [],
  }) {
    this.name = name;
    this.baseAttr = baseAttr;
    this.hp = hp;
    this.stats = stats;
    this.damage = baseDamage;
    this.armor = baseArmor;
    this.asOptions = asOptions;
    this.level = level;
    this.statsPerLevel = statsPerLevel;

    this.effects = [];
    this.items = items;
    this.incAs = 0;

    this.initItems();
    this.initLevels();
    this.initStats();
    this.initAs(asOptions);
  }

  initLevels() {
    this.stats.s += this.statsPerLevel.s * (this.level - 1);
    this.stats.a += this.statsPerLevel.a * (this.level - 1);
    this.stats.i += this.statsPerLevel.a * (this.level - 1);
  }

  initStats() {
    this.hp += Math.floor(this.stats.s) * hpForStrength;
    this.incAs += Math.floor(this.stats.a) * asForAgility;
    this.armor += this.stats.a * armorForAgility;

    switch (this.baseAttr) {
      case STRENGTH:
        this.damage += Math.floor(this.stats.s);
        break;
      case AGILITY:
        this.damage += Math.floor(this.stats.a);
        break;
      case INTELLIGENCE:
        this.damage += Math.floor(this.stats.i);
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

  getAttackSpeed() {
    return this.attackSpeed + this.attackDeley;
  }

  getResist() {
    return (this.armor * 0.06) / (1 + this.armor * 0.06);
  }

  attack(target) {
    root.innerHTML += `<i>${this.name} attacks ${target.name}</i>`;
    this.timeBeforeAttack = this.as;

    this.items.forEach(({ effect }) => {
      if (effect) {
        effect.effect(target, this);
      }
    });
    target.hp = Math.round(target.hp - this.damage * (1 - target.getResist()));
  }

  initItems() {
    this.items.forEach((item) => {
      if (item) {
        if (item.strength) {
          this.stats.s += item.strength;
          // if (this.baseAttr === STRENGTH) {
          //   this.damage += item.strength;
          // }
          // this.hp += item.strength * hpForStrength;
        }
        if (item.agility) {
          this.stats.a += item.agility;
          // if (this.baseAttr === AGILITY) {
          //   this.damage += item.agility;
          // }
          // this.as += item.agility * asForAgility;
          // this.armor += item.agility * armorForAgility;
        }
        if (item.damage) {
          this.damage += item.damage;
        }
        if (item.as) {
          this.incAs += item.as;
        }
        if (item.armor) {
          this.armor += item.armor;
        }
      }
    });
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
    root.innerHTML += `<p><b>${this.name}</b> (${this.damage}): ${this.hp}`;
  }
}
