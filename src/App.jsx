import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "./routes";
import { getEmpoyees } from "./redux/reducers/employeesReducer";

class App extends Component {
  state = {
    scrolling: false,
  };

  componentDidMount() {
    this.props.getEmpoyees();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">
            <h1>City of Chicago Employees</h1>
          </Link>
          {/* If input != '' use filter json */}
          <Routes />
        </div>
      </Router>
    );
  }
}

export default connect(null, { getEmpoyees })(App);
