import React, { Component } from "react";

export default class index extends Component {
  state = {
    name: "",
    department: "",
    employee_annual_salary: "",
    job_titles: "",
  };

  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form>
        <input
          onChange={this.handleFormChange}
          name="name"
          type="text"
          placeholder="Full Name"
        />
        <input
          onChange={this.handleFormChange}
          name="department"
          type="text"
          placeholder="Deparment"
        />
        <input
          onChange={this.handleFormChange}
          name="employee_annual_salary"
          type="text"
          placeholder="Annual Salary"
        />
        <input
          onChange={this.handleFormChange}
          name="job_titles"
          type="text"
          placeholder="Job Title"
        />
        <button>Submit</button>
      </form>
    );
  }
}
