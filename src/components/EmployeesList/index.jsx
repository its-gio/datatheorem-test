import React, { useEffect, useRef } from "react";
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
  }, [props.focus, props.employeesCount]);

  function handleKeyDown(e) {
    if (e.keyCode === 13 && props.focus) {
      props.history.push(`/employee/${props.focus}`);
    } else {
      props.arrowChangeFocus(props.focus, e.keyCode, props.employeesCount);
    }
  }

  const employeesMapped = props.employees.map((employee, i) => {
    // if (props.employeesCount === i + 1) {
    //   return (
    //     <EmlpoyeeesMap
    //       key={employee.id}
    //       id={employee.id}
    //       job_titles={employee.job_titles}
    //       name={employee.name}
    //       // ref={this.lastEmployee}
    //     />
    //   );
    // } else {
    return (
      <EmlpoyeeesMap
        key={employee.id}
        id={employee.id}
        job_titles={employee.job_titles}
        name={employee.name}
      />
    );
    // }
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
  employees: reduxState.employees.employees,
  loading: reduxState.employees.loading,
  focus: reduxState.employees.focus,
  employeesCount: reduxState.employees.employeesCount,
});

export default connect(mapStateToProps, { arrowChangeFocus })(Index);
