import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../img/Loading.gif";
import {
  getEmployee,
  arrowChangeFocus,
  enterOnEmployeeDisplay,
} from "../../redux/reducers/employeesReducer";

class Index extends Component {
  componentDidMount() {
    this.props.getEmployee(this.props.match.params.id);
    document.addEventListener("keydown", this.handleKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyEvent);
  }

  componentDidUpdate(prevProps) {
    if (this.props.focus !== prevProps.focus) {
      // If focus changes get new employee and update page
      this.props.getEmployee(this.props.focus);
      this.props.history.push(`/employee/${this.props.focus}`);
    }
  }

  handleKeyEvent = (e) => {
    if (e.keyCode === 13) {
      // If enter is pressed
      this.props.enterOnEmployeeDisplay(this.props.focus);
      this.props.history.push(`/`);
    } else if (e.keyCode === 38 || e.keyCode === 40) {
      // If Up or Down is pressed (No filter exists)
      this.props.arrowChangeFocus(
        this.props.focus,
        e.keyCode,
        1,
        this.props.employeesCount
      );
    }
  };

  render() {
    return this.props.loading || this.props.employee === null ? (
      <img src={Spinner} alt="Loading Content" />
    ) : (
      <div>
        {this.props.focus ? null : <Redirect to="/" />}
        <h1>Employee Information display</h1>
        <p>ID: {this.props.employee.id}</p>
        <p>Name: {this.props.employee.name}</p>
        <p>Title: {this.props.employee.job_titles}</p>
        <p>Salary: ${this.props.employee.employee_annual_salary}</p>
        <p>Department: {this.props.employee.department}</p>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  employee: reduxState.employees.employee,
  loading: reduxState.employees.loading,
  focus: reduxState.employees.focus,
  employeesCount: reduxState.employees.employeesCount,
  employeesFilterCount: reduxState.employees.employeesFilterCount,
  iOfFirstEmployee: reduxState.employees.iOfFirstEmployee,
  iOfLastEmployee: reduxState.employees.iOfLastEmployee,
});

export default connect(mapStateToProps, {
  getEmployee,
  arrowChangeFocus,
  enterOnEmployeeDisplay,
})(Index);
