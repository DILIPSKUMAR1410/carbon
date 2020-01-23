import React, { Component } from "react";
import { UserSession, AppConfig } from "blockstack";

import "./survey.css";

const appConfig = new AppConfig();
const options = { encrypt: false };
const userSession = new UserSession({ appConfig: appConfig });

class SurveyForm extends Component {
  state = {
    answers: {
      household: {
        q1: "",
        q2: "",
        q3: "",
        q4: ""
      },
      electronics: {
        q1: ""
      },
      car: {
        q1: "",
        q2: "",
        q3: ""
      },
      flight: {
        q1: "",
        q2: ""
      },
      food: {
        q1: ""
      },
      transport: {
        q1: "",
        q2: "",
        q3: ""
      },
      cycle: {
        q1: ""
      },
      tree: {
        q1: ""
      },
      sharing: {
        q1: ""
      }
    }
  };

  questions = {
    household: [
      "No. of persons in your house: ",
      "Electricity consumption in kwH: ",
      "LPG consumption in litres: ",
      "Wood consumption in tonnes: "
    ],
    flight: ["Class of Travel(Economy/Business): ", "Total Miles: "],
    transport: [
      "Total miles in a bus: ",
      "Total miles in Train: ",
      "Total miles in tube/subway: "
    ],
    car: [
      "Fuel used(Petro/diesel/CNG): ",
      "Mileage of your vehicle(miles): ",
      "Total Miles: "
    ],
    electronics: ["Amount of Electronics purchased in US$: "],
    food: ["Amount of Red Meat consumed in Kg: "],
    cycle: ["No. of miles cycled instead of a car: "],
    tree: ["No. of Saplings planted: "],
    sharing: ["No. of miles car pooled instead of driving alone: "]
  };

  onChangeHandler = e => {
    let cat = this.state.answers[this.props.category];
    cat[e.target.name] = e.target.value;
    this.setState({
      answers: {
        ...this.state.answers,
        [this.props.category]: cat
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { category } = this.props;
    let data =
      JSON.parse(localStorage.getItem("carbon.data_footprint")) || null;
    if (!data)
      data = {
        [this.props.month + "_" + this.props.year]: null
      };
    if (!data[this.props.month + "_" + this.props.year]) {
      data[this.props.month + "_" + this.props.year] = this.state.answers;
    } else {
      data[this.props.month + "_" + this.props.year][
        category
      ] = this.state.answers[category];
    }
    userSession
      .putFile("carbon.json", JSON.stringify(data), options)
      .then(() => {
        localStorage.setItem("carbon.data_footprint", JSON.stringify(data));
        alert("Data has been submitted");
      });
  };

  render() {
    const questions = this.questions[this.props.category];
    const inputs = questions.map((item, index) => {
      return (
        <div>
          <label className="form__label" htmlFor={`q${index + 1}`}>
            {questions[index]}
          </label>
          <input
            name={`q${index + 1}`}
            placeholder="Enter your answer"
            className="form__input"
            value={this.state.answers[this.props.category][`q${index + 1}`]}
            onChange={this.onChangeHandler}
          />
        </div>
      );
    });

    return (
      <div className="survey-container">
        <form className="survey__form">
          {inputs}

          <input
            type="submit"
            value="Submit"
            className="submit__btn"
            onClick={this.onSubmit}
          />
        </form>
      </div>
    );
  }
}

export default SurveyForm;
