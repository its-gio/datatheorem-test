import React, { Component } from "react";
import { connect } from "react-redux";
import spinner from "../../img/Loading.gif";
import { postEmployee } from "../../redux/reducers/employeesReducer";

class Index extends Component {
  state = {
    name: "",
    department: "",
    salary_string: null,
    job_titles: "",
  };

  handleFormChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    new Promise((res, rej) => {
      res(this.props.postEmployee(this.state));
    }).then(() => this.props.history.push("/"));
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
          step=".01"
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
          {this.props.loading ? (
            <img src={spinner} alt="Loading Submit" />
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  loading: reduxState.employees.loading,
});
export default connect(mapStateToProps, { postEmployee })(Index);
