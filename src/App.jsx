import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import { getEmpoyees } from "./redux/reducers/employeesReducer";

class App extends Component {
  componentDidMount() {
    this.props.getEmpoyees();
    // this.scrollListener = window.addEventListener("scroll", (e) =>
    //   this.handleScroll(e)
    // );
  }

  getContent = () => {
    // .then((blob) => blob.json())
    // .then((res) =>
    //   this.setState({
    //     employees: [...this.state.employees, ...res],
    //     scrolling: false,
    //     loading: false,
    //   })
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
          <Routes />
        </div>
      </Router>
    );
  }
}

export default connect(null, { getEmpoyees })(App);
