import React from "react";
import { Switch, Route } from "react-router-dom";
import EmployeesList from "./components/EmployeesList";
import EmployeeForm from "./components/EmployeeForm";

export default (
  <Switch>
    <Route path="/employee-form" component={EmployeeForm} />
    <Route
      path="/"
      component={EmployeesList}
      // employees={props.employees}
    />
    <Route
      path="/"
      component={EmployeesList}
      // employees={props.employees}
    />
  </Switch>
);
