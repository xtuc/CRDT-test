/* @flow */

export function stateToString(state: [UnitType]) {
  return state.map(x => x.value).join('');
}
