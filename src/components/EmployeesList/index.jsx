import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import EmlpoyeeesMap from "./EmlpoyeeesMap";
import Spinner from "../../img/Loading.gif";
import { arrowChangeFocus } from "../../redux/reducers/employeesReducer";

function Index(props) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.focus]);

  function handleKeyDown(e) {
    if (e.keyCode === 13 && props.focus) {
      props.history.push(`/employee/${props.focus}`);
    } else {
      props.arrowChangeFocus(
        props.focus,
        e.keyCode,
        props.employeesShownCount - 1
      );
    }
  }

  const employeesMapped = props.employeesShown.map((employee) => {
    return (
      <EmlpoyeeesMap
        key={employee.id}
        id={employee.id}
        job_titles={employee.job_titles}
        name={employee.name}
        fullCount={props.employeesCount}
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
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  employeesShown: reduxState.employees.employeesShown,
  employeesShownCount: reduxState.employees.employeesShownCount,
  employeesCount: reduxState.employees.employeesCount,
  loading: reduxState.employees.loading,
  focus: reduxState.employees.focus,
});

export default connect(mapStateToProps, { arrowChangeFocus })(Index);
