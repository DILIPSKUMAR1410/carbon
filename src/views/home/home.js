import React, { Component } from "react";
import NavBar from "../../components/navbar";
import "./home.css";

import landinggif from "../../public/landing.gif";
import { UserSession, AppConfig } from "blockstack";
import workflow from "../../public/images/workflow.png";

const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

export default class Home extends Component {
  handleSignin = e => {
    e.preventDefault();
    userSession.redirectToSignIn();
  };

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then(userData => {
        this.props.history.push("/dashboard");
      });
    }
  }

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
        </section>
        <section className="footer">
          {!userSession.isUserSignedIn() ? (
            <button
              className="footer__link footer__link--login"
              onClick={this.handleSignin}
            >
              Login with BlockStack
            </button>
          ) : (
            <button
              className="footer__link footer__link--login"
              onClick={this.handleSignOut}
            >
              Logout
            </button>
          )}
          <div className="footer__bottom-bar">
            <div className="bottom-bar__item">
              Copyright @mycarbonfootprint 2019
            </div>
          </div>
        </section>
      </div>
    );
  }
}
