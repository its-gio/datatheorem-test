import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmlpoyeeesMap from "./EmlpoyeeesMap";
import Spinner from "../../img/Loading.gif";

class index extends Component {
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.keyCode === 13 && this.props.focus) {
      this.props.history.push(`/employee/${this.props.focus}`);
    }
  };

  render() {
    const employeesMapped = this.props.employees.map((employee) => (
      <EmlpoyeeesMap
        key={employee.id}
        id={employee.id}
        job_titles={employee.job_titles}
        name={employee.name}
      />
    ));

    return (
      <div className="employees-list">
        <div className="employees-list--title">
          <h2>Employees List</h2>
          <div className="employees-list--title__link-containter">
            <Link to="/employee-form">
              <button>+</button>
            </Link>
          </div>
        </div>
        <ul>{employeesMapped}</ul>
        {this.props.loading && <img src={Spinner} alt="Loading Content" />}
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  employees: reduxState.employees.employees,
  loading: reduxState.employees.loading,
  page: reduxState.employees.page,
  focus: reduxState.employees.focus,
});

export default connect(mapStateToProps, {})(index);
