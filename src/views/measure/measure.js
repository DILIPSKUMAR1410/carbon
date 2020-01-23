import React, { Component } from "react";
import Modal from "../../components/modal";
import NavBar from "../../components/navbar";

import household from "../../public/images/household.png";
import car from "../../public/images/car.png";
import tv from "../../public/images/tv.png";
import flight from "../../public/images/flight.png";
import food from "../../public/images/food.png";
import transport from "../../public/images/transport.png";

import "./measure.css";

class Measure extends Component {
  state = {
    activeOption: null,
    showModal: false,
    month: "January",
    year: 2020
  };

  showModal = target => {
    this.setState({
      showModal: true,
      activeOption: target
    });
  };

  hideModal = () => {
    this.setState({
      activeOption: null,
      showModal: false
    });
  };

  onClickHandler = target => {
    this.showModal(target);
  };

  onChangeHandler = e => {
    this.setState({
      month: e.target.value
    });
  };
  onChangeHandler2 = e => {
    this.setState({
      year: e.target.value
    });
  };

  render() {
    return (
      <div className="measure">
        <NavBar />
        <div>
          <p>
            Please choose a particular month for entering carbon footprint data.
          </p>

          <select className="select-css" onChange={this.onChangeHandler}>
            <option>Select Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
          <input
            className="input__year"
            onChange={this.onChangeHandler2}
            value={this.state.year}
            placeholder="Year"
          />
        </div>
        <div className="measure__choices">
          <div
            className="measure__option"
            onClick={() => {
              this.onClickHandler("household");
            }}
          >
            <img className="option__image" src={household} alt="household" />
            <p className="option__text">Household</p>
          </div>
          <div
            className="measure__option"
            onClick={() => {
              this.onClickHandler("car");
            }}
          >
            <img className="option__image" src={car} alt="car" />
            <p className="option__text">Car</p>
          </div>
          <div
            className="measure__option"
            onClick={() => {
              this.onClickHandler("electronics");
            }}
          >
            <img className="option__image" src={tv} alt="car" />
            <p className="option__text">Electronics</p>
          </div>
          <div
            className="measure__option"
            onClick={() => {
              this.onClickHandler("flight");
            }}
          >
            <img className="option__image" src={flight} alt="flight" />
            <p className="option__text">Flight</p>
          </div>
          <div
            className="measure__option"
            onClick={() => {
              this.onClickHandler("food");
            }}
          >
            <img className="option__image" src={food} alt="food" />
            <p className="option__text">Food</p>
          </div>
          <div
            className="measure__option"
            onClick={() => {
              this.onClickHandler("transport");
            }}
          >
            <img className="option__image" src={transport} alt="transport" />
            <p className="option__text">Public Transport</p>
          </div>
        </div>
        <Modal
          show={this.state.showModal}
          close={this.hideModal}
          header={this.state.activeOption}
          source="measure"
          category={this.state.activeOption}
          month={this.state.month}
          year={this.state.year}
        />
      </div>
    );
  }
}

export default Measure;
