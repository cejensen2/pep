import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapCell from './MapCell';
import {
  turnRefresh,
  selectUnit,
  clearSelected,
  executeAttack,
  executeMove,
  endUnitTurn,
} from '../store/reducer';
import selectTarget from '../AI/selectTarget';
import findNearestSpace from '../AI/findNearestSpace';

export class Map extends Component {
  constructor(props) {
    super(props);
    this.endPlayerTurn = this.endPlayerTurn.bind(this);
    this.AITurn = this.AITurn.bind(this);
  }

  endPlayerTurn() {
    //console.log('checking to see if turn is over...');
    let turnOver = true;
    this.props.units.map(unit => {
      if (unit.team === 1 && !unit.turnEnded) {
        //console.log('turn is not over!');
        turnOver = false;
      }
    });
    if (turnOver) {
      //console.log('turn is over');
      this.AITurn();
    }
  }

  AITurn() {
    console.log('AI turn starting...');
    this.props.units.map(unit => {
      if (unit.team === 2) {
        this.props.selectUnit(unit, unit.index);
        const target = selectTarget(unit, this.props.units);
        if (
          Math.abs(target.x - unit.x) + Math.abs(target.y - unit.y) <=
          unit.range
        ) {
          console.log('attacking...');
          this.props.executeMove(unit.x, unit.y);
          this.props.executeAttack(unit, target);
          this.props.endUnitTurn(unit.index);
        } else if (
          Math.abs(target.x - unit.x) + Math.abs(target.y - unit.y) <=
          unit.range + unit.move
        ) {
          console.log('moving to attack...');
          const targetSpace = findNearestSpace(unit, target, this.props.units);
          console.log(targetSpace);
          this.props.executeMove(targetSpace[0], targetSpace[1]);
          this.props.executeAttack(unit, target);
          this.props.endUnitTurn(unit.index);
        } else {
          console.log('moving...');
          const targetSpace = findNearestSpace(unit, target, this.props.units);
          console.log(targetSpace);
          this.props.executeMove(targetSpace[0], targetSpace[1]);
          this.props.endUnitTurn(unit.index);
        }
      }
    });
    this.props.turnRefresh();
  }

  componentDidUpdate() {
    this.endPlayerTurn();
  }

  render() {
    return (
      <table>
        <tbody>
          {this.props.gameMap.map((row, x) => {
            return (
              <tr>{row.map((cell, y) => <MapCell x={x + 1} y={y + 1} />)}</tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameMap: state.basereducer.gameMap,
    units: state.basereducer.units,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    turnRefresh: () => dispatch(turnRefresh()),
    selectUnit: (unit, index) => dispatch(selectUnit(unit, index)),
    clearSelected: () => dispatch(clearSelected()),
    executeMove: (x, y) => dispatch(executeMove(x, y)),
    executeAttack: (att, def) => dispatch(executeAttack(att, def)),
    endUnitTurn: index => dispatch(endUnitTurn(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
