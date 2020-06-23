import React from "react";

function index(props) {
  // const employeesMapprops = props.employees.map((employee) => (
  //   <li key={employee.id} id={employee.id} className="employees-list--employee">
  //     Title: {employee.job_titles} | Name: {employee.name}
  //   </li>
  // ));
  return (
    <div className="employees-list">
      <h2>Employees List</h2>
      {/* <ul>{employeesMapprops}</ul> */}
    </div>
  );
}

export default index;
