export class PhaseBoots {
    constructor(range) {
      this.armor = 4;
      switch (range) {
        case (MELEE):
      this.damage = 18;
        break;
        case (RANGE):
      this.chance = 12;
        break;
      }
    }
}
  