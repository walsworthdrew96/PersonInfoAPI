import React, { Component } from "react";

class PersonCreateForm extends Component {
  render() {
    return (
      <form
        className="col-12 form-group"
        onSubmit={this.props.createPersonFormSubmit}
      >
        <label htmlFor="IdInput">Id</label>
        <input
          type="text"
          className="form-control form-control-md"
          id="IdInput"
          aria-describedby="IdInput"
          placeholder="Id"
          value={this.props.selectedPerson.id}
          onChange={this.props.onPersonInputChange}
          disabled={true}
        ></input>
        <label htmlFor="FirstNameInput">First Name</label>
        <input
          type="text"
          className="form-control form-control-md"
          id="FirstNameInput"
          aria-describedby="FirstNameInput"
          placeholder="First Name"
          value={this.props.selectedPerson.firstName}
          onChange={this.props.onPersonInputChange}
        ></input>
        <label htmlFor="LastNameInput">Last Name</label>
        <input
          type="text"
          className="form-control form-control-md"
          id="LastNameInput"
          aria-describedby="LastNameInput"
          placeholder="Last Name"
          value={this.props.selectedPerson.lastName}
          onChange={this.props.onPersonInputChange}
        ></input>
        <input
          className="btn btn-primary"
          type="submit"
          value="Create"
          style={{ float: "right", marginTop: "10px" }}
        ></input>
      </form>
    );
  }
}

export default PersonCreateForm;
