import { STRENGTH, AGILITY } from "../../utils/constants";

export const PowerTreads = function(mode) {
    this.as = 25;
    switch (mode)
    {
        case STRENGTH:
            this.strength = 10;
        break;

        case AGILITY:
            this.agility = 10;
        break;

        case INTELLIGENCE:
            this.intelligence = 10;
        break;
    }
}