import React, { useRef, useCallback } from "react";
import { connect } from "react-redux";
import {
  clickChangeFocus,
  showNextEmployees,
} from "../../redux/reducers/employeesReducer";

function EmlpoyeeesMap(props) {
  const observer = useRef();
  const lastEmployeeRef = useCallback(
    (node) => {
      if (props.loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entry) => {
        if (
          entry[0].isIntersecting &&
          props.employeesShownCount !== props.fullCount
        ) {
          console.log("Loading Show");
          props.showNextEmployees(props.employeesShownCount);
        }
      });
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.load]
  );

  if (props.id === props.employeesShownCount) {
    console.log(props.employeesShownCount, props.fullCount);
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
  employeesShownCount: reduxState.employees.employeesShownCount,
});

export default connect(mapStateToProps, {
  clickChangeFocus,
  showNextEmployees,
})(EmlpoyeeesMap);
