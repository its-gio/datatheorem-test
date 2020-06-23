import React, { Component } from "react";
import EmployeesList from "./components/EmployeesList";

export default class App extends Component {
  state = {
    employees: [],
    employeesFilter: [],
    persons: 500,
    page: 1,
  };

  componentDidMount() {
    this.getContent();
  }

  getContent = () => {
    fetch(
      `https://dt-interviews.appspot.com/?page=${this.state.page}&per_page=${this.state.persons}`
    )
      .then((blob) => blob.json())
      .then((res) =>
        this.setState({ employees: [...this.state.employees, ...res] })
      );
  };

  loadMore = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.getContent
    );
  };

  render() {
    return (
      <div className="App">
        <h1>City of Chicago Employees</h1>
        {/* If input != '' use filter json */}
        <EmployeesList employees={this.state.employees} />
        <a onClick={this.loadMore}>Load More</a>
      </div>
    );
  }
}
