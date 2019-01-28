import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  selectUnit,
  clearSelected,
  executeMove,
  executeAttack,
  endUnitTurn,
} from '../store/reducer';

export class MapCell extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(evt) {
    //If no unit is selected
    if (!this.props.selectedUnit.type) {
      //If there is a target and it has not ended its turn, select it
      if (
        evt.target.attributes.index &&
        !this.props.units[Number(evt.target.attributes.index.value)].turnEnded
      ) {
        this.props.selectUnit(
          this.props.units[Number(evt.target.attributes.index.value)],
          Number(evt.target.attributes.index.value)
        );
      }
      //If the selected unit is on the AI team and there is a target, select it
    } else if (
      this.props.selectedUnit.team === 2 &&
      evt.target.attributes.index
    ) {
      this.props.selectUnit(
        this.props.units[Number(evt.target.attributes.index.value)],
        Number(evt.target.attributes.index.value)
      );
      //If the selected unit is on the player team
    } else if (this.props.selectedUnit.team === 1) {
      //If there is a selected target on the player's team whose turn hasn't ended that is not the currently active unit, select it
      if (
        evt.target.attributes.index &&
        this.props.units[Number(evt.target.attributes.index.value)].team ===
          1 &&
        !this.props.units[Number(evt.target.attributes.index.value)]
          .turnEnded &&
        Number(evt.target.attributes.index.value) !==
          this.props.selectedUnit.index
      ) {
        this.props.selectUnit(
          this.props.units[Number(evt.target.attributes.index.value)],
          Number(evt.target.attributes.index.value)
        );
        //If there is a reachable space and the unit hasn't moved, move to the space
      } else if (
        evt.target.attributes.reachable.value === 'true' &&
        !this.props.selectedUnit.hasMoved
      ) {
        this.props.executeMove(
          Number(evt.target.attributes.x.value),
          Number(evt.target.attributes.y.value)
        );
        //If there is a reachable space and the unit has moved, end its turn
      } else if (
        evt.target.attributes.reachable.value === 'true' &&
        this.props.selectedUnit.hasMoved
      ) {
        this.props.endUnitTurn(Number(evt.target.attributes.index.value));
        //If there is an enemy unit on the space
      } else if (
        evt.target.attributes.index &&
        this.props.units[Number(evt.target.attributes.index.value)].team === 2
      ) {
        //If the target is in range and the selected unit has moved, attack it
        if (
          evt.target.attributes.attackable.value === 'true' &&
          this.props.selectedUnit.hasMoved
        ) {
          this.props.executeAttack(
            this.props.selectedUnit,
            this.props.units[Number(evt.target.attributes.index.value)]
          );
          this.props.endUnitTurn(Number(evt.target.attributes.index.value));
          //Otherwise select the enemy unit
        } else {
          this.props.selectUnit(
            this.props.units[Number(evt.target.attributes.index.value)],
            Number(evt.target.attributes.index.value)
          );
        }
      } else {
        this.props.clearSelected();
      }
    } else {
      this.props.clearSelected();
    }
  }

  render() {
    let reachable = 'false';
    let attackable = 'false';
    if (this.props.selectedUnit.type && !this.props.selectedUnit.hasMoved) {
      if (
        Math.abs(this.props.x - this.props.selectedUnit.x) +
          Math.abs(this.props.y - this.props.selectedUnit.y) <=
        this.props.selectedUnit.move
      ) {
        reachable = 'true';
      } else if (
        Math.abs(this.props.x - this.props.selectedUnit.x) +
          Math.abs(this.props.y - this.props.selectedUnit.y) <=
        this.props.selectedUnit.move + this.props.selectedUnit.range
      ) {
        attackable = 'true';
      }
    } else if (this.props.selectedUnit.type) {
      if (
        Math.abs(this.props.x - this.props.selectedUnit.x) +
          Math.abs(this.props.y - this.props.selectedUnit.y) ===
        0
      ) {
        reachable = 'true';
      } else if (
        Math.abs(this.props.x - this.props.selectedUnit.x) +
          Math.abs(this.props.y - this.props.selectedUnit.y) <=
          this.props.selectedUnit.range &&
        Math.abs(this.props.x - this.props.selectedUnit.x) +
          Math.abs(this.props.y - this.props.selectedUnit.y) >
          0
      ) {
        attackable = 'true';
      }
    }
    for (let i = 0; i < this.props.units.length; i++) {
      if (
        this.props.units[i].x === this.props.x &&
        this.props.units[i].y === this.props.y
      ) {
        return (
          <td
            team={this.props.units[i].team}
            index={i}
            onClick={this.handleClick}
            reachable={reachable}
            attackable={attackable}
            x={this.props.x}
            y={this.props.y}
          >
            {this.props.units[i].display}
          </td>
        );
      }
    }
    return (
      <td
        reachable={reachable}
        attackable={attackable}
        onClick={this.handleClick}
        x={this.props.x}
        y={this.props.y}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    units: state.basereducer.units,
    selectedUnit: state.basereducer.selectedUnit,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectUnit: (unit, index) => dispatch(selectUnit(unit, index)),
    clearSelected: () => dispatch(clearSelected()),
    executeMove: (x, y) => dispatch(executeMove(x, y)),
    executeAttack: (att, def) => dispatch(executeAttack(att, def)),
    endUnitTurn: index => dispatch(endUnitTurn(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapCell);
