import React, { Component } from "react";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import "bootstrap/dist/css/bootstrap.css";

import Modal from "../../components/modal";
import NavBar from "../../components/navbar";
import "./track.css";

class Track extends Component {
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
      <div className="track">
        <NavBar />
        <div>
          <p>
            Please choose a particular month for viewing carbon footprint data.
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
        <div className="track__choices">
          <div
            className="track__option"
            onClick={() => {
              this.onClickHandler("footprint");
            }}
          >
            Carbon Footprint
          </div>
          <div
            className="track__option"
            onClick={() => {
              this.onClickHandler("mitigated");
            }}
          >
            Carbon Mitigated
          </div>
          <div
            className="track__option"
            onClick={() => {
              this.onClickHandler("chart");
            }}
          >
            Comparative Chart
          </div>
        </div>
        <Modal
          show={this.state.showModal}
          close={this.hideModal}
          source="track"
          category={this.state.activeOption}
          month={this.state.month}
          year={this.state.year}
        />
      </div>
    );
  }
}

export default Track;
