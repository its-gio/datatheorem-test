import React from "react";
import { connect } from "react-redux";
import { changePage } from "../../redux/reducers/employeesReducer";

function Pagination(props) {
  const pageNumbers = [];
  let pagesCount = props.employeesFilterCount
    ? Math.ceil(props.employeesFilterCount / props.peopleShown)
    : Math.ceil(props.employeesCount / props.peopleShown);

  for (let i = 1; i <= pagesCount; i++) {
    pageNumbers.push(i);
  }

  function checkDisplay(condition, num) {
    if (condition === "greater" && props.pageShown > num) {
      return "";
    } else if (
      condition === "less" &&
      props.pageShown + num <= pageNumbers.length
    ) {
      return "";
    }
    return "hidden";
  }

  return (
    <div className="pagination">
      <ul className="pagination--inner">
        <li
          className={`pagination--inner__num ${checkDisplay("greater", 1)}`}
          onClick={() => props.changePage(1)}
        >
          1
        </li>
        <span className={`${checkDisplay("greater", 3)}`}>...</span>
        <li
          className={`pagination--inner__num ${checkDisplay("greater", 2)}`}
          onClick={() => props.changePage(props.pageShown - 1)}
        >
          {props.pageShown - 1}
        </li>
        <li className="pagination--inner__num active">{props.pageShown}</li>
        <li
          className={`pagination--inner__num ${checkDisplay("less", 2)}`}
          onClick={() => props.changePage(props.pageShown + 1)}
        >
          {props.pageShown + 1}
        </li>
        <span className={`${checkDisplay("less", 3)}`}>...</span>
        <li
          className={`pagination--inner__num ${checkDisplay("less", 1)}`}
          onClick={() => props.changePage(pageNumbers.length)}
        >
          {pageNumbers.length}
        </li>
      </ul>
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  peopleShown: reduxState.employees.peopleShown,
  employeesCount: reduxState.employees.employeesCount,
  pageShown: reduxState.employees.pageShown,
  employeesFilterCount: reduxState.employees.employeesFilterCount,
});

export default connect(mapStateToProps, { changePage })(Pagination);
