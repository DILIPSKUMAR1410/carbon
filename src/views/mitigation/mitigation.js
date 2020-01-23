import React, { Component } from "react";

import NavBar from "../../components/navbar";
import Modal from "../../components/modal";

import bicycle from "../../public/images/bicycle.png";
import sprout from "../../public/images/sprout.png";
import sharing from "../../public/images/sharing.png";

import "./mitigation.css";

class Mitigation extends Component {
  state = {
    activeOption: null,
    showModal: false,
    month: "January",
    year: 2020
  };

  header = "Carbon Footprint";
  content =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
  // content = {
  //   "footprint": <Piechart
  // }

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
      <div className="mitigation">
        <NavBar />
        <div>
          <p>
            Please choose a particular month for entering carbon mitigation
            measures
          </p>
          <select class="select-css" onChange={this.onChangeHandler}>
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
            class="input__year"
            onChange={this.onChangeHandler2}
            value={this.state.year}
            placeholder="Year"
          />
        </div>
        <div className="mitigation__choices">
          <div
            className="mitigation__option"
            onClick={() => this.onClickHandler("cycle")}
          >
            <img className="option__image" src={bicycle} alt="" />
          </div>
          <div
            className="mitigation__option"
            onClick={() => this.onClickHandler("sharing")}
          >
            <img className="option__image" src={sharing} alt="" />
          </div>
          <div
            className="mitigation__option"
            onClick={() => this.onClickHandler("tree")}
          >
            <img className="option__image" src={sprout} alt="" />
          </div>
        </div>
        <Modal
          show={this.state.showModal}
          close={this.hideModal}
          category={this.state.activeOption}
          source="mitigation"
          month={this.state.month}
          year={this.state.year}
        />
      </div>
    );
  }
}

export default Mitigation;
