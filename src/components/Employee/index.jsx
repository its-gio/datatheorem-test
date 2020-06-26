import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../../img/Loading.gif";
import { getEmployee } from "../../redux/reducers/employeesReducer";

class index extends Component {
  componentDidMount() {
    this.props.getEmployee(this.props.match.params.id);
  }
  render() {
    return this.props.loading ? (
      <img src={Spinner} alt="Loading Content" />
    ) : (
      <div>
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
});

export default connect(mapStateToProps, { getEmployee })(index);
