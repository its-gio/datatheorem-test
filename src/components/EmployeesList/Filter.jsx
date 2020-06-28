import React from "react";
import { connect } from "react-redux";
import { handleFilterChange } from "../../redux/reducers/employeesReducer";

function Filter(props) {
  function handleFilterChange(e) {
    props.handleFilterChange(e.target.value);
  }

  return (
    <div>
      <select defaultValue="" onChange={handleFilterChange} name="department">
        <option value="" disabled>
          -- Filter Options --
        </option>
        {props.departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  departments: reduxState.employees.departments,
  employeesFilter: reduxState.employees.employeesFilter,
  employeesFilterCount: reduxState.employees.employeesFilterCount,
});

export default connect(mapStateToProps, { handleFilterChange })(Filter);
