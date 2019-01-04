const gameMap = new Array(20);
for (let i = 0; i < gameMap.length; i++) {
  let newRow = new Array(30);
  for (let j = 0; j < newRow.length; j++) {
    newRow[j] = { value: 0 };
  }
  gameMap[i] = newRow.slice();
}

const initialState = {
  gameMap
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
