import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmlpoyeeesMap from "./EmlpoyeeesMap";
import Pagination from "./Pagination";
import Spinner from "../../img/Loading.gif";
import {
  arrowChangeFocus,
  showNextEmployees,
} from "../../redux/reducers/employeesReducer";

function Index(props) {
  useEffect(() => {
    props.showNextEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageShown]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.focus, props.pageShown]);

  function handleKeyDown(e) {
    if (e.keyCode === 13 && props.focus) {
      props.history.push(`/employee/${props.focus}`);
    } else {
      props.arrowChangeFocus(
        props.focus,
        e.keyCode,
        props.iOfFirstEmployee,
        props.iOfLastEmployee
      );
    }
  }

  const employeesMapped = props.employeesDisplay.map((employee) => {
    return (
      <EmlpoyeeesMap
        key={employee.id}
        id={employee.id}
        job_titles={employee.job_titles}
        name={employee.name}
      />
    );
  });

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
      {props.loading && <img src={Spinner} alt="Loading Content" />}
      <Pagination />
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  employeesDisplay: reduxState.employees.employeesDisplay,
  loading: reduxState.employees.loading,
  focus: reduxState.employees.focus,
  pageShown: reduxState.employees.pageShown,
  peopleShown: reduxState.employees.peopleShown,
  iOfFirstEmployee: reduxState.employees.iOfFirstEmployee,
  iOfLastEmployee: reduxState.employees.iOfLastEmployee,
});

export default connect(mapStateToProps, {
  arrowChangeFocus,
  showNextEmployees,
})(Index);
