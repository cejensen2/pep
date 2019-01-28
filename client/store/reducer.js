export const mapHeight = 7;
export const mapWidth = 7;

const gameMap = new Array(mapHeight);
for (let i = 0; i < gameMap.length; i++) {
  let newRow = new Array(mapWidth);
  for (let j = 0; j < newRow.length; j++) {
    newRow[j] = { value: 0 };
  }
  gameMap[i] = newRow.slice();
}

const initialUnits = [
  {
    type: 'Soldier',
    health: 100,
    maxHealth: 100,
    move: 4,
    range: 2,
    damage: 40,
    defense: 20,
    team: 1,
    x: 2,
    y: 1,
    display: 'S',
    hasMoved: false,
    turnEnded: false,
    index: 0,
  },
  {
    type: 'Soldier',
    health: 100,
    maxHealth: 100,
    move: 4,
    range: 2,
    damage: 40,
    defense: 20,
    team: 1,
    x: 1,
    y: 2,
    display: 'S',
    hasMoved: false,
    turnEnded: false,
    index: 1,
  },
  {
    type: 'Soldier',
    health: 100,
    maxHealth: 100,
    move: 4,
    range: 2,
    damage: 40,
    defense: 20,
    team: 2,
    x: mapHeight,
    y: mapWidth - 1,
    display: 'S',
    hasMoved: false,
    turnEnded: false,
    index: 2,
  },
  {
    type: 'Soldier',
    health: 100,
    maxHealth: 100,
    move: 4,
    range: 2,
    damage: 40,
    defense: 20,
    team: 2,
    x: mapHeight - 1,
    y: mapWidth,
    display: 'S',
    hasMoved: false,
    turnEnded: false,
    index: 3,
  },
];

const initialState = {
  gameMap,
  units: initialUnits,
  activeTeam: 1,
  selectedUnit: {},
  selectedIndex: -1,
};

const SELECT_UNIT = 'SELECT_UNIT';
export const selectUnit = (unit, index) => {
  return {
    type: SELECT_UNIT,
    unit: unit,
    index: index,
  };
};

const CLEAR_SELECTED = 'CLEAR_SELECTED';
export const clearSelected = () => {
  return {
    type: CLEAR_SELECTED,
  };
};

const EXECUTE_MOVE = 'EXECUTE_MOVE';
export const executeMove = (x, y) => {
  return {
    type: EXECUTE_MOVE,
    x: x,
    y: y,
  };
};

const EXECUTE_ATTACK = 'EXECUTE_ATTACK';
export const executeAttack = (att, def) => {
  return {
    type: EXECUTE_ATTACK,
    att: att,
    def: def,
  };
};

const END_UNIT_TURN = 'END_UNIT_TURN';
export const endUnitTurn = index => {
  return {
    type: END_UNIT_TURN,
    index: index,
  };
};

const TURN_REFRESH = 'TURN_REFRESH';
export const turnRefresh = () => {
  return {
    type: TURN_REFRESH,
  };
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SELECT_UNIT:
      return {
        ...state,
        selectedUnit: action.unit,
        selectedIndex: action.index,
      };
    case CLEAR_SELECTED:
      return {
        ...state,
        selectedUnit: {},
        selectedIndex: -1,
      };
    case EXECUTE_MOVE:
      const movedUnitArray = state.units.map(unit => {
        if (unit.index === state.selectedIndex) {
          return {
            ...unit,
            x: action.x,
            y: action.y,
            hasMoved: true,
          };
        } else {
          return unit;
        }
      });
      return {
        ...state,
        units: movedUnitArray,
        selectedUnit: movedUnitArray[state.selectedIndex],
      };
    case EXECUTE_ATTACK:
      const newHealth =
        state.units[action.def.index].health -
        (state.units[action.att.index].damage -
          state.units[action.def.index].defense);
      if (newHealth <= 0) {
        const newUnitArray = state.units.map(unit => {
          if (unit.index !== action.def.index) {
            return unit;
          }
        });
        const newMappedUnitArray = newUnitArray.map((unit, index) => {
          return {
            ...unit,
            index: index,
          };
        });
        return {
          ...state,
          units: newMappedUnitArray,
        };
      } else {
        const damagedUnitArray = state.units.map(unit => {
          if (unit.index === action.def.index) {
            return {
              ...unit,
              health: newHealth,
            };
          } else {
            return unit;
          }
        });
        return {
          ...state,
          units: damagedUnitArray,
        };
      }
    case END_UNIT_TURN:
      const endedUnitArray = state.units.map(unit => {
        if (unit.index === state.selectedIndex) {
          return {
            ...unit,
            turnEnded: true,
          };
        } else {
          return unit;
        }
      });
      return {
        ...state,
        units: endedUnitArray,
        selectedUnit: {},
        selectedIndex: -1,
      };
    case TURN_REFRESH:
      const freshUnitArray = state.units.map(unit => {
        return {
          ...unit,
          hasMoved: false,
          turnEnded: false,
        };
      });
      return {
        ...state,
        units: freshUnitArray,
      };
    default:
      return state;
  }
}
