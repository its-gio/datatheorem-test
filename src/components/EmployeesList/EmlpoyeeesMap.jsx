import React from "react";
import { connect } from "react-redux";
import { clickChangeFocus } from "../../redux/reducers/employeesReducer";

function EmlpoyeeesMap(props) {
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

const mapStateToProps = (reduxState) => ({
  focus: reduxState.employees.focus,
});

export default connect(mapStateToProps, { clickChangeFocus })(EmlpoyeeesMap);
