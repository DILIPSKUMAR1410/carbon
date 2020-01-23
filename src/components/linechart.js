import React, { Component } from "react";
import * as d3 from "d3";
import "./linechart.css";

class LineChart extends Component {
  componentDidMount() {
    this.drawLineChart();
  }
  drawLineChart = () => {
    const temp = JSON.parse(localStorage.getItem("carbon.data_footprint"));

    const footprints = Object.keys(temp).map(item => {
      const { household, car, electronics, flight, food, transport } = temp[
        item
      ];
      const flightConst =
        flight.q1.toLowerCase() === "economy" ? 0.000242 : 0.000697;
      const fuelConst = car.q1.toLowerCase() === "petrol" ? 0.00825 : 0.00975;
      const value =
        (household.q2 * 0.0002773 +
          household.q3 * 0.00152 +
          household.q4 * 0.07) /
          household.q1 +
        (car.q2 / car.q3) * fuelConst +
        electronics.q1 * 0.00004 +
        flight.q2 * flightConst +
        food.q1 * 0.00364 +
        transport.q1 * 0.0002 +
        transport.q2 * 0.0001 +
        transport.q3 * 0.00005;

      return {
        date: item,
        price: value
      };
    });

    const mitigations = Object.keys(temp).map(item => {
      const { cycle, sharing, tree } = temp[item];
      const value =
        cycle.q1 * 0.00825 + sharing.q1 * 0.00825 + tree.q1 * 0.0015;
      return {
        date: item,
        price: value
      };
    });

    var data = [
      {
        name: "Carbon Footprint",
        values: footprints
      },
      {
        name: "Carbon Mitigation",
        values: mitigations
      }
    ];

    var width = 500;
    var height = 300;
    var margin = 50;
    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.5px";
    var lineStrokeHover = "2.5px";

    var circleOpacity = "0.85";
    var circleOpacityOnLineHover = "0.25";
    var circleRadius = 3;
    var circleRadiusHover = 6;

    /* Format Data */
    var parseDate = d3.timeParse("%B_%Y");
    data.forEach(function(d) {
      d.values.forEach(function(d) {
        d.date = parseDate(d.date);
        d.price = +d.price;
      });
    });

    /* Scale */
    var xScale = d3
      .scaleTime()
      .domain(d3.extent(data[0].values, d => d.date))
      .range([0, width - margin]);

    var yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data[1].values, d => d.price)])
      .range([height - margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    var svg = d3
      .select("#chart")
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    /* Add line into SVG */
    var line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.price));

    let lines = svg.append("g").attr("class", "lines");

    lines
      .selectAll(".line-group")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "line-group")
      .on("mouseover", function(d, i) {
        svg
          .append("text")
          .attr("class", "title-text")
          .style("fill", color(i))
          .text(d.name)
          .attr("text-anchor", "middle")
          .attr("x", (width - margin) / 2)
          .attr("y", 5);
      })
      .on("mouseout", function(d) {
        svg.select(".title-text").remove();
      })
      .append("path")
      .attr("class", "line")
      .attr("d", d => line(d.values))
      .style("stroke", (d, i) => color(i))
      .style("opacity", lineOpacity)
      .on("mouseover", function(d) {
        d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
        d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
        d3.select(this)
          .style("opacity", lineOpacityHover)
          .style("stroke-width", lineStrokeHover)
          .style("cursor", "pointer");
      })
      .on("mouseout", function(d) {
        d3.selectAll(".line").style("opacity", lineOpacity);
        d3.selectAll(".circle").style("opacity", circleOpacity);
        d3.select(this)
          .style("stroke-width", lineStroke)
          .style("cursor", "none");
      });

    /* Add circles in the line */
    lines
      .selectAll("circle-group")
      .data(data)
      .enter()
      .append("g")
      .style("fill", (d, i) => color(i))
      .selectAll("circle")
      .data(d => d.values)
      .enter()
      .append("g")
      .attr("class", "circle")
      .on("mouseover", function(d) {
        d3.select(this)
          .style("cursor", "pointer")
          .append("text")
          .attr("class", "text")
          .text(`${d.price}`)
          .attr("x", d => xScale(d.date) + 5)
          .attr("y", d => yScale(d.price) - 10);
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .style("cursor", "none")
          .transition()
          .duration(duration)
          .selectAll(".text")
          .remove();
      })
      .append("circle")
      .attr("cx", d => xScale(d.date))
      .attr("cy", d => yScale(d.price))
      .attr("r", circleRadius)
      .style("opacity", circleOpacity)
      .on("mouseover", function(d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadiusHover);
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .transition()
          .duration(duration)
          .attr("r", circleRadius);
      });

    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Total values");
  };
  render() {
    return <div id="chart"></div>;
  }
}

export default LineChart;
