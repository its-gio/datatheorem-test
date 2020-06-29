import React, { useState } from "react";
import { connect } from "react-redux";
import {
  handleFilterChange,
  clearFilter,
} from "../../redux/reducers/employeesReducer";

function Filter(props) {
  const [dropdownValue, setDropdownValue] = useState();
  function handleFilterChange(e) {
    setDropdownValue(e.target.value);
    props.handleFilterChange(e.target.value);
  }

  function handleClearBTN() {
    setDropdownValue("");
    props.clearFilter();
  }

  return (
    <div>
      <select
        value={dropdownValue}
        defaultValue=""
        onChange={handleFilterChange}
        name="department"
      >
        <option value="" disabled>
          -- Filter Options --
        </option>
        {props.departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <button onClick={handleClearBTN}>Clear Filter</button>
    </div>
  );
}

const mapStateToProps = (reduxState) => ({
  departments: reduxState.employees.departments,
  department: reduxState.employees.department,
});

export default connect(mapStateToProps, { handleFilterChange, clearFilter })(
  Filter
);
