const { Hero } = require('./models/heroes');
const { WraithBand } = require('./models/items');
const { AGILITY, root } = require('./utils/constants');

const logHeroes = (...heroes) => {
  heroes.forEach((hero) => hero.log());
};

const logFignt = (step, time, ...heroes) => {
  root.innerHTML += `<h3>Step ${step}. Time ${time}ms</h3>`;
  logHeroes(...heroes);
  root.innerHTML += '<br><hr><br>';
};

const checkEnd = (hero1, hero2) => {
  if (hero1.hp <= 0 && hero2.hp <= 0) {
    root.innerHTML += '<h1><center>ничья</center></h1>';
    return true;
  }
  if (hero1.hp <= 0) {
    root.innerHTML += `<h1><center>${hero2.name} победил</center></h1>`;
    return true;
  }
  if (hero2.hp <= 0) {
    root.innerHTML += `<h1><center>${hero1.name} победил</center></h1>`;
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

const main = () => {
  const sniper = new Hero({
    name: 'Sniper',
    baseAttr: AGILITY,
    baseDamage: 18,
    baseArmor: -1,
    stats: {
      s: 19,
      a: 21,
      i: 15,
    },
    items: [
      // new Basher(),
      // new PowerTreads(AGILITY),
      new WraithBand(),
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
  });

  const bs = new Hero({
    name: 'Bloodseeker',
    baseAttr: AGILITY,
    baseDamage: 36,
    baseArmor: 2,
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
};

main();
