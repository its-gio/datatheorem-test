import React, { Component } from "react";
import spinner from "../../img/Loading.gif";

export default class index extends Component {
  state = {
    name: "",
    department: "",
    salary_string: null,
    job_titles: "",
    loading: false,
  };

  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    let { name, department, salary_string, job_titles } = this.state;
    const employee_annual_salary = Number(salary_string).toFixed(2);
    const proxy = "https://cors-anywhere.herokuapp.com/";
    fetch(`${proxy}https://dt-interviews.appspot.com/`, {
      method: "POST",
      headers: {
        // prettier-ignore
        "Accept": "application/json, text/plain, */*",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        department,
        employee_annual_salary,
        job_titles,
      }),
    })
      .then((blob) => blob.json())
      .then((data) => {
        this.props.history.push("/");
      })
      .catch((err) => console.error(err));
  };

  render() {
    return (
      <form className="employee-form" onSubmit={this.handleFormSubmit}>
        <input
          onChange={this.handleFormChange}
          name="name"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          onChange={this.handleFormChange}
          name="department"
          type="text"
          placeholder="Deparment"
          required
        />
        <input
          onChange={this.handleFormChange}
          name="salary_string"
          type="number"
          placeholder="Annual Salary"
          required
        />
        <input
          onChange={this.handleFormChange}
          name="job_titles"
          type="text"
          placeholder="Job Title"
          required
        />
        <div className="employee-form--btn-container">
          {this.state.loading ? (
            <img src={spinner} alt="Loading Submit" />
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    );
  }
}
