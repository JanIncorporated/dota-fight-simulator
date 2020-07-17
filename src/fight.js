import logger from 'loglevel';
import { Hero } from 'Models/heroes';
import { WraithBand } from 'Models/items';
import { AGILITY } from 'Utils/constants';

logger.setLevel('info');

const logHeroes = (...heroes) => {
  heroes.forEach((hero) => hero.log());
};

const logFignt = (step, time, ...heroes) => {
  logger.info(`Step ${step}. Time ${time}ms`);
  logHeroes(...heroes);
};

const checkEnd = (hero1, hero2) => {
  if (hero1.hp <= 0 && hero2.hp <= 0) {
    logger.info('ничья');
    return true;
  }
  if (hero1.hp <= 0) {
    logger.info(`${hero2.name} победил`);
    return true;
  }
  if (hero2.hp <= 0) {
    logger.info(`${hero1.name} победил`);
    return true;
  }
  return false;
};

const fight = (hero1, hero2) => {
  let step = 0;
  let time = 1;
  logFignt(step, time, hero1, hero2);
  // eslint-disable-next-line no-constant-condition
  while (true) {
    hero1.reduceTimeBeforeAttack();
    hero2.reduceTimeBeforeAttack();

    if (hero1.timeBeforeAttack === 0) {
      hero1.attack(hero2);
      step += 1;
      logFignt(step, time, hero1, hero2);
    }
    if (hero2.timeBeforeAttack === 0) {
      hero2.attack(hero1);
      step += 1;
      logFignt(step, time, hero1, hero2);
    }

    if (checkEnd(hero1, hero2)) return;
    time += 1;
  }
};

export const main = () => {

  const sniper = new Hero({
    name: 'Sniper',
    baseAttr: AGILITY,
    initialDamage: 18,
    initialArmor: -1,
    stats: {
      s: 19,
      a: 21,
      i: 15,
    },
    items: [
      // new Basher(),
      // new PowerTreads(AGILITY),
      // new WraithBand(),
      // new WraithBand(),
      // new WraithBand(),
      // new WraithBand(),
    ],
    level: 2,
    statsPerLevel: {
      s: 1.7,
      a: 3.4,
      i: 2.6,
    },
    asOptions: {
      baseAs: 1.7,
      initAs: 100,
    },
  })

  const bs = new Hero({
    name: 'Bloodseeker',
    baseAttr: AGILITY,
    initialDamage: 36,
    initialArmor: 2,
    stats: {
      s: 24,
      a: 22,
      i: 18,
    },
    level: 2,
    statsPerLevel: {
      s: 2.7,
      a: 3.4,
      i: 1.7,
    },
    asOptions: {
      baseAs: 1.7,
      initAs: 100,
    },
  });

  fight(sniper, bs);
  logger.info(sniper);
};
