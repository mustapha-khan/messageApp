import React, { Component } from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      check: {}
    };
  }

  logOut = e => {
    e.preventDefault();
    this.props.logoutUser(this.props.check.history);
  };

  componentWillReceiveProps(nextProps) {
    // if (nextProps.auth.isAuthenticated) {
    //    ;
    //   // this.props.history.push("/dashboard"); // push user to dashboard when they login
    // }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  render() {
    const user = JSON.parse(localStorage.getItem("isUser"));

    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper grey">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center black-text"
            >
              Message App
            </Link>
            <button
              style={{
                margin: "1rem",
                width: "100px",
                borderRadius: "3px",
                letterSpacing: "0.5px",
                marginTop: "1rem"
              }}
              onClick={this.logOut}
              className="btn btn-small   blue "
            >
              log out
            </button>
          </div>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);

// export default Navbar;
