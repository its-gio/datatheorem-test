import React from "react";
import { Switch, Route } from "react-router-dom";
import Employee from "./components/Employee";
import EmployeesList from "./components/EmployeesList";
import EmployeeForm from "./components/EmployeeForm";

export default function Routes(props) {
  console.log(props);
  return (
    <Switch>
      <Route path="/employee-form" component={EmployeeForm} />
      <Route path="/employee/:id" component={Employee} />
      <Route
        path="/"
        component={EmployeesList}
        employees={props.employees}
        loading={props.loading}
      />
    </Switch>
  );
}
