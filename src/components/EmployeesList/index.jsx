import React, { Component } from 'react'

export default class index extends Component {
  state = {
    employees: []
  }

  componentDidMount() {
    fetch("https://dt-interviews.appspot.com/")
    .then(blob => blob.json())
    .then(res => this.setState({ employees: res}))
  }

  render() {
    return (
      <div className="employees-list">
        <h2>testing</h2>
      </div>
    )
  }
}
