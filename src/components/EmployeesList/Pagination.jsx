import React from "react";
import { connect } from "react-redux";
import { changePage } from "../../redux/reducers/employeesReducer";

function Pagination(props) {
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(props.employeesCount / props.peopleShown);
    i++
  ) {
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
});

export default connect(mapStateToProps, { changePage })(Pagination);
