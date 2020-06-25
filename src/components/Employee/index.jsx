import React, { Component } from "react";
import { connect } from "react-redux";

class index extends Component {
  render() {
    return (
      <div>
        <h1>Employee Information display</h1>
      </div>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  employee: reduxState.employees.employee,
  loading: reduxState.employees.loading,
});

export default connect(mapStateToProps, null)(index);
