import { AGILITY } from 'Utils/constants';

export const Sniper = {
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
      // new Bracer(),
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
}