import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/navbar";
import "./home.css";

import landinggif from "../../public/landing.gif";
// import tools from "../../public/images/tools.png";
// import measure from "../../public/images/measure.png";
// import speechBub from "../../public/images/speech_bubble.png";
// import thinking from "../../public/images/man_thinking.png";
import workflow from "../../public/images/workflow.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <NavBar loggedIn={false} />
        <section className="landing">
          <div className="landing__container">
            <img
              src={landinggif}
              alt="landing gif"
              className="landing__image"
            />
            <div className="landing__text">
              <p>
                Track your footprint and bring your life closer to nature. It is
                not possible to do away emissions at one go but it is possible
                to reduce emissions one step at a time. My Footprint helps you
                track your carbon footprint and suggests measures to bring you
                closer to being carbon neutral.
              </p>
            </div>
          </div>
        </section>
        <section className="process">
          <h1 className="process__title">How it works?</h1>
          <img src={workflow} alt="" />
          {/* <div className="process__step process__step--dark">
            <img className="step__img" src={measure} />
            <p className="step__text"> Step 1: Track your journey. </p>
          </div>
          <div className="process__step process__step--light">
            <img className="step__img" src={thinking} />
            <p className="step__text"> Step 2: Understand the implications. </p>
          </div>
          <div className="process__step process__step--dark">
            <img className="step__img" src={speechBub} />
            <p className="step__text">
              {" "}
              Step 3: Think of the corrective measures.{" "}
            </p>
          </div>
          <div className="process__step process__step--light">
            <img className="step__img" src={tools} />
            <p className="step__text"> Step 4: Change and update. </p>
          </div> */}
        </section>
        <section className="footer">
          <Link to="/login" className="footer__link footer__link--login">
            Login
          </Link>
          <div className="footer__bottom-bar">
            {/* <div className="bottom-bar__item">Privacy/Terms</div> */}
            <div className="bottom-bar__item">Copyright 2019</div>
          </div>
        </section>
      </div>
    );
  }
}
