import React, { useRef, useCallback } from "react";
import { connect } from "react-redux";
import { clickChangeFocus } from "../../redux/reducers/employeesReducer";

function EmlpoyeeesMap(props) {
  const observer = useRef();
  const lastEmployeeRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entry) => {
      if (entry[0].isIntersecting) {
        console.log("Visable");
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  if (props.id === props.employeesFilterCount) {
    return (
      <li
        ref={lastEmployeeRef}
        onClick={() => props.clickChangeFocus(props.id)}
        id={props.id}
        className={
          props.focus === props.id
            ? "employees-list--employee hl"
            : "employees-list--employee"
        }
      >
        Title: {props.job_titles} | Name: {props.name}
      </li>
    );
  } else {
    return (
      <li
        onClick={() => props.clickChangeFocus(props.id)}
        id={props.id}
        className={
          props.focus === props.id
            ? "employees-list--employee hl"
            : "employees-list--employee"
        }
      >
        Title: {props.job_titles} | Name: {props.name}
      </li>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  focus: reduxState.employees.focus,
  employeesFilterCount: reduxState.employees.employeesFilterCount,
});

export default connect(mapStateToProps, { clickChangeFocus })(EmlpoyeeesMap);
