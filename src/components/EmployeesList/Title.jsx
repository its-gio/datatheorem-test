import React from "react";
import { Link } from "react-router-dom";

function Title() {
  return (
    <div className="employees-list--title">
      <h2>Employees List</h2>
      <div className="employees-list--title__link-containter">
        <Link to="/employee-form">
          <button>+</button>
        </Link>
      </div>
    </div>
  );
}

export default Title;
