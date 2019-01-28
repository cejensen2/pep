const mapHeight = 7;
const mapWidth = 7;

function findNearestSpace(mover, target, units) {
  let coords = [mover.x, mover.y];
  //debugger;
  for (let i = 1; i <= mapHeight; i++) {
    for (let j = 1; j <= mapWidth; j++) {
      if (
        Math.abs(target.x - i) + Math.abs(target.y - j) <
          Math.abs(target.x - coords[0]) + Math.abs(target.y - coords[1]) &&
        Math.abs(target.x - i) + Math.abs(target.y - j) <= mover.move
      ) {
        let hasUnit = false;
        units.map(unit => {
          if (unit.x === i && unit.y === j) {
            hasUnit = true;
          }
        });
        if (!hasUnit) {
          coords = [i, j];
        }
      }
    }
  }
  return coords;
}

export default findNearestSpace;
