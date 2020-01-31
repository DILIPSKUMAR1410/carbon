import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../public/images/green_tea.png";
import { UserSession, AppConfig } from "blockstack";
const appConfig = new AppConfig();
const userSession = new UserSession({ appConfig: appConfig });

class NavBar extends Component {
  constructor(props) {
    super(props);
    let loggedIn = true;
    if (this.props && this.props.loggedIn === false) {
      loggedIn = this.props.loggedIn;
    }
    this.state = {
      loggedIn: loggedIn,
      username: loggedIn ? userSession.loadUserData().username : ""
    };
    console.log(this.state);
  }

  handleSignOut = e => {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  };

  render() {
    return (
      <nav className="navbar" style={styles.navStyle}>
        <Link to="/">
          <img
            className="navbar__logo"
            src={logo}
            alt="logo"
            style={styles.logoStyle}
          />
        </Link>
        <span style={styles.navBrandStyle}>My Carbon Footprint</span>
        {!this.state.loggedIn && userSession.isUserSignedIn() ? (
          <React.Fragment>
            <Link to="/dashboard" style={{ color: "green", margin: "1rem" }}>
              Dashboard
            </Link>
            <Link to="/measure" style={{ color: "green" }}>
              Measure
            </Link>
            <Link to="/track" style={{ color: "green", margin: "1rem" }}>
              Track
            </Link>
          </React.Fragment>
        ) : (
          ""
        )}
        <div className="navbar__user" style={styles.navUserTextStyle}>
          {this.state.loggedIn ? (
            <span>
              Hello{" "}
              <Link to="/dashboard" style={{ fontWeight: "bold" }}>
                {this.state.username}!
              </Link>
              <span
                className="nav__logout"
                style={{
                  color: "green",
                  margin: "1rem",
                  border: "1px solid green",
                  padding: ".5rem 1rem",
                  cursor: "pointer"
                }}
                onClick={this.handleSignOut}
              >
                Logout
              </span>
            </span>
          ) : (
            ""
          )}
        </div>
      </nav>
    );
  }
}

const navHeight = "10vh";

const styles = {
  navStyle: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxHeight: navHeight,
    padding: "0.5rem 1rem",
    backgroundColor: "#e8e8e8"
  },

  logoStyle: {
    maxHeight: navHeight
  },

  navTextStyle: {
    fontSize: "1.5em",
    color: "#3fa43f"
  },
  navUserTextStyle: {
    fontSize: "1em",
    color: "#3fa43f"
  },
  navBrandStyle: {
    marginRight: "auto",
    marginLeft: "1rem",
    fontSize: "1.5em",
    color: "#3fa43f"
  }
};
export default NavBar;
