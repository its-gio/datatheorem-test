import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Routes from "./routes";
import { getEmpoyees } from "./redux/reducers/employeesReducer";

class App extends Component {
  state = {
    scrolling: false,
  };

  componentDidMount() {
    this.props.getEmpoyees();
    // this.scrollListener = window.addEventListener("scroll", (e) =>
    //   this.handleScroll(e)
    // );
  }

  // loadMore = () => {
  //   this.setState({ scrolling: true });
  //   this.props.getEmpoyees();
  // };

  // handleScroll = (e) => {
  //   if (this.state.scrolling) return;
  //   const lastLi = document.querySelector(
  //     "ul > .employees-list--employee:last-child"
  //   );
  //   const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
  //   const pageOffset = window.pageYOffset + window.innerHeight;
  //   if (pageOffset > lastLiOffset - 40) this.loadMore();
  // };

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

export default connect(null, { getEmpoyees })(App);
