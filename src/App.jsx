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
      res(this.props.getEmpoyees(this.props.page, this.props.persons));
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
          {/* If input != '' use filter json */}
          <Routes />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  employees: reduxState.employees.employees,
  persons: reduxState.employees.persons,
  page: reduxState.employees.page,
});

export default connect(mapStateToProps, { getEmpoyees })(App);
