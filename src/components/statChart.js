import React, { Component } from "react";
import PieChart from "./piechart";
import LineChart from "./linechart";

class StatChart extends Component {
  render() {
    if (this.props.category === "chart") {
      return <LineChart />;
    } else {
      const fp = JSON.parse(localStorage.getItem("carbon.data_footprint"));
      console.log(fp);
      console.log(this.props.month + "_" + this.props.year);
      if (this.props.category === "mitigated") {
        const { cycle, sharing, tree } = fp[
          this.props.month + "_" + this.props.year
        ];
        const data = [
          { name: "Cycle", value: cycle.q1 * 0.00825 },
          { name: "Sharing", value: sharing.q1 * 0.00825 },
          { name: "Sapplings", value: tree.q1 * 0.0015 }
        ];
        return <PieChart month={this.props.month} data={data} />;
      } else {
        const { household, car, electronics, flight, food, transport } = fp[
          this.props.month + "_" + this.props.year
        ];
        const fuelConst = car.q1.toLowerCase() === "petrol" ? 0.00825 : 0.00975;
        const flightConst =
          flight.q1.toLowerCase() === "economy" ? 0.000242 : 0.000697;
        const data = [
          {
            name: "Household",
            value:
              (household.q2 * 0.0002773 +
                household.q3 * 0.00152 +
                household.q4 * 0.07) /
              household.q1
          },
          { name: "Vehicles", value: (car.q2 / car.q3) * fuelConst },
          { name: "Electronics", value: electronics.q1 * 0.00004 },
          { name: "Flight", value: flight.q2 * flightConst },
          { name: "Food", value: food.q1 * 0.00364 },
          {
            name: "Public Transport",
            value:
              transport.q1 * 0.0002 +
              transport.q2 * 0.0001 +
              transport.q3 * 0.00005
          }
        ];
        return <PieChart month={this.props.month} data={data} />;
      }
    }
  }
}

export default StatChart;
