import React from "react";
import { Switch, Route } from "react-router-dom";
import Employee from "./components/Employee/Index";
import EmployeesList from "./components/EmployeesList/Index";
import EmployeeForm from "./components/EmployeeForm/Index";

export default function Routes(props) {
  return (
    <Switch>
      <Route path="/employee-form" component={EmployeeForm} />
      <Route path="/employee/:id" component={Employee} />
      <Route path="/" component={EmployeesList} />
    </Switch>
  );
}
