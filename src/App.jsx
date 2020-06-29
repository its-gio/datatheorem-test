import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "./routes";
import { getEmpoyees } from "./redux/reducers/employeesReducer";

class App extends Component {
  componentDidMount() {
    this.gettingEmployees();
  }

  gettingEmployees = () => {
    new Promise((res, rej) => {
      res(this.props.getEmpoyees(this.props.APIPage, this.props.APIPeople));
    }).then((data) => {
      if (data.action.payload.length === 0) return console.log("finished!");
      this.gettingEmployees();
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Link to="/">
            <h1>City of Chicago Employees</h1>
          </Link>
          <Routes />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  APIPeople: reduxState.employees.APIPeople,
  APIPage: reduxState.employees.APIPage,
  employeesFilter: reduxState.employees.employeesFilter,
});

export default connect(mapStateToProps, { getEmpoyees })(App);
