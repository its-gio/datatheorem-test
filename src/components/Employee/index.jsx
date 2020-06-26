import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../../img/Loading.gif";
import {
  getEmployee,
  arrowChangeFocus,
} from "../../redux/reducers/employeesReducer";

class index extends Component {
  componentDidMount() {
    this.props.getEmployee(this.props.match.params.id);
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    console.log(`${this.props.focus} ${prevProps.focus}`);
    if (this.props.focus !== prevProps.focus) {
      this.props.getEmployee(this.props.focus);
      this.props.history.push(`/employee/${this.props.focus}`);
    }
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.history.push(`/`);
    } else {
      this.props.arrowChangeFocus(this.props.focus, e.keyCode);
    }
  };

  render() {
    return this.props.loading ? (
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
});

export default connect(mapStateToProps, { getEmployee, arrowChangeFocus })(
  index
);
