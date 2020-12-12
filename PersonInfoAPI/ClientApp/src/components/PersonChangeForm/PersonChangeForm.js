import React, { Component, Fragment } from "react";

class PersonChangeForm extends Component {
  render() {
    return (
      <Fragment>
        <form className="col-12 form-group">
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
            className="btn btn-warning"
            type="submit"
            value="Edit"
            onClick={this.props.editPersonOnClick}
          ></input>
          <input
            className="btn btn-danger"
            type="submit"
            value="Delete"
            onClick={this.props.deletePersonOnClick}
          ></input>
        </form>
        <button
          className="btn btn-danger"
          type="submit"
          value="Cancel"
          style={{ float: "right" }}
          onClick={this.props.deselectPersonOnClick}
        >
          Cancel
        </button>
      </Fragment>
    );
  }
}

export default PersonChangeForm;
