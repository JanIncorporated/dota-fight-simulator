import { STRENGTH, AGILITY, INTELLIGENCE } from 'utils/constants';

export class PowerTreads {
  constructor(mode) {
    this.as = 25;
    switch (mode) {
      case STRENGTH:
        this.strength = 10;
        break;

      case AGILITY:
        this.agility = 10;
        break;

      case INTELLIGENCE:
        this.intelligence = 10;
        break;

      default:
        break;
    }
  }
}
