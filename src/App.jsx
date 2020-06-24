import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";

export default class App extends Component {
  state = {
    employees: [],
    employeesFilter: [],
    persons: 500,
    page: 1,
    scrolling: false,
    loading: true,
  };

  componentDidMount() {
    this.getContent();
    this.scrollListener = window.addEventListener("scroll", (e) =>
      this.handleScroll(e)
    );
  }

  getContent = () => {
    fetch(
      `https://dt-interviews.appspot.com/?page=${this.state.page}&per_page=${this.state.persons}`
    )
      .then((blob) => blob.json())
      .then((res) =>
        this.setState({
          employees: [...this.state.employees, ...res],
          scrolling: false,
          loading: false,
        })
      );
  };

  loadMore = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.getContent
    );
  };

  handleScroll = (e) => {
    if (this.state.scrolling) return;
    const lastLi = document.querySelector(
      "ul > .employees-list--employee:last-child"
    );
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    if (pageOffset > lastLiOffset - 40) this.loadMore();
  };

  render() {
    return (
      <Router>
        <div className="App">
          <h1>City of Chicago Employees</h1>
          {/* If input != '' use filter json */}
          <Routes
            employees={this.state.employees}
            employeesFilter={this.state.employeesFilter}
            loading={this.state.loading}
          />
        </div>
      </Router>
    );
  }
}
