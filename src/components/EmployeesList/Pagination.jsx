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

  return (
    <div className="pagination">
      <ul className="pagination--inner">
        {pageNumbers.map((num) => {
          return (
            <li
              onClick={() => props.changePage(num)}
              className={
                num === props.pageShown
                  ? "pagination--inner__num active"
                  : "pagination--inner__num"
              }
              key={num}
            >
              {num}
            </li>
          );
        })}
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
