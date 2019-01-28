function selectTarget(unit, units) {
  const potentialTargets = units.filter(target => target.team === 1);
  let selectedTarget = potentialTargets[0];
  for (let i = 0; i < potentialTargets.length; i++) {
    if (
      Math.abs(potentialTargets[i].x - unit.x) +
        Math.abs(potentialTargets[i].y - unit.y) <=
      unit.move + unit.range
    ) {
      if (
        Math.abs(potentialTargets[i].x - unit.x) +
          Math.abs(potentialTargets[i].y - unit.y) <=
        unit.range
      ) {
        selectedTarget = potentialTargets[i];
      } else if (potentialTargets[i].health < selectedTarget.health) {
        selectedTarget = potentialTargets[i];
      } else if (
        Math.abs(potentialTargets[i].x - unit.x) +
          Math.abs(potentialTargets[i].y - unit.y) <
        Math.abs(selectedTarget.x - unit.x) +
          Math.abs(selectedTarget.y - unit.y)
      ) {
        selectedTarget = potentialTargets[i];
      }
    } else if (
      Math.abs(potentialTargets[i].x - unit.x) +
        Math.abs(potentialTargets[i].y - unit.y) <
      Math.abs(selectedTarget.x - unit.x) + Math.abs(selectedTarget.y - unit.y)
    ) {
      selectedTarget = potentialTargets[i];
    }
  }
  return selectedTarget;
}

export default selectTarget;
