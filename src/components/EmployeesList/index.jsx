import React from "react";
import { connect } from "react-redux";
import Spinner from "../../img/Loading.gif";
import { Link } from "react-router-dom";

function index(props) {
  const employeesMapprops = props.employees.map((employee) => (
    <li key={employee.id} id={employee.id} className="employees-list--employee">
      Title: {employee.job_titles} | Name: {employee.name}
    </li>
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
      <ul>{employeesMapprops}</ul>
      {props.loading && <img src={Spinner} alt="Loading Content" />}
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  employees: reduxState.employees.employees,
  loading: reduxState.employees.loading,
  page: reduxState.employees.page,
});

export default connect(mapStateToProps, null)(index);
