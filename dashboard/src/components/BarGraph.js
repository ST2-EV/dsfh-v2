import React, { Component } from "react";
import { VictoryChart, VictoryBar, VictoryTheme, VictoryLabel } from "victory";

export default class BarGraph extends Component {
  render() {
    return (
      <VictoryChart domainPadding={50} theme={VictoryTheme.material}>
        <VictoryBar
          alignment="start"
          labelComponent={<VictoryLabel textAnchor="start" angle="-45" />}
          data={this.props.data}
          x="index"
          y="names"
        />
      </VictoryChart>
    );
  }
}
