import React, { Component } from "react";
import SurveyForm from "./surveyForm";
import StatChart from "./statChart";

class Modal extends Component {
  close = () => {
    this.props.close();
  };

  render() {
    if (!this.props.show) return null;
    else
      return (
        <div
          className="modal"
          id="modal"
          style={
            this.props.source === "track" ? styles.modalTrack : styles.modal
          }
        >
          <div
            className="modal__header"
            style={{ fontCapsVariant: "smallCaps" }}
          >
            <h3>{this.props.category.toUpperCase()}</h3>
          </div>
          <div className="modal__content">
            {this.props.source !== "track" ? (
              <SurveyForm
                category={this.props.category}
                month={this.props.month}
                year={this.props.year}
              />
            ) : (
              <StatChart
                category={this.props.category}
                month={this.props.month}
                year={this.props.year}
              />
            )}
          </div>
          <div className="modal__footer" style={{ marginTop: "auto" }}>
            <button
              className="modal__close"
              style={styles.button}
              onClick={this.close}
            >
              Close
            </button>
          </div>
        </div>
      );
  }
}

const styles = {
  modal: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: "2rem",
    alignItems: "center",
    height: "90vh",
    width: "80vw",
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-60%, -50%)",
    backgroundColor: "white",
    boxShadow: "0 0 0 100vmax rgba(0, 0, 0, 0.4)",
    borderRadius: "1rem"
  },
  modalTrack: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: "2rem",
    alignItems: "center",
    height: "fit-content",
    width: "80vw",
    position: "absolute",
    top: "60%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    boxShadow: "0 0 0 100vmax rgba(0, 0, 0, 0.4)",
    borderRadius: "1rem"
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "0.9em",
    color: "rgb(20, 160, 20)",
    backgroundColor: "white",
    border: "2px currentColor solid",
    borderRadius: "1rem",
    cursor: "pointer"
  }
};

export default Modal;
