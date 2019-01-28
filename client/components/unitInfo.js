import React, { Component } from 'react';
import { connect } from 'react-redux';

export class UnitInfo extends Component {
  render() {
    if (this.props.selectedUnit.type) {
      return (
        <div>
          <p>Class: {this.props.selectedUnit.type}</p>
          <p>
            Health: {this.props.selectedUnit.health}/{
              this.props.selectedUnit.maxHealth
            }
          </p>
          <p>Move: {this.props.selectedUnit.move}</p>
          <p>Range: {this.props.selectedUnit.range}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    selectedUnit: state.basereducer.selectedUnit,
  };
};

export default connect(mapStateToProps)(UnitInfo);
