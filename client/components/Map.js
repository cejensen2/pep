import React, { Component } from "react";
import { connect } from "react-redux";
import MapCell from "./MapCell";

export class Map extends Component {
  render() {
    //console.log(this.props);
    return (
      <table>
        <tbody>
          {this.props.gameMap.map(row => (
            <tr>{row.map(cell => <MapCell />)}</tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameMap: state.basereducer.gameMap
  };
};

export default connect(mapStateToProps)(Map);
