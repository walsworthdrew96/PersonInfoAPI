import React from "react";

const PersonCreateForm = ({
  createPersonFormSubmit,
  selectedPerson,
  onPersonInputChange,
}) => {
  return (
    <form className="col-12 form-group" onSubmit={createPersonFormSubmit}>
      <label htmlFor="IdInput">Id</label>
      <input
        type="text"
        className="form-control form-control-md"
        id="IdInput"
        aria-describedby="IdInput"
        placeholder="Id"
        value={selectedPerson.id}
        onChange={onPersonInputChange}
        disabled={true}
      ></input>
      <label htmlFor="FirstNameInput">First Name</label>
      <input
        type="text"
        className="form-control form-control-md"
        id="FirstNameInput"
        aria-describedby="FirstNameInput"
        placeholder="First Name"
        value={selectedPerson.firstName}
        onChange={onPersonInputChange}
      ></input>
      <label htmlFor="LastNameInput">Last Name</label>
      <input
        type="text"
        className="form-control form-control-md"
        id="LastNameInput"
        aria-describedby="LastNameInput"
        placeholder="Last Name"
        value={selectedPerson.lastName}
        onChange={onPersonInputChange}
      ></input>
      <input
        className="btn btn-primary"
        type="submit"
        value="Create"
        style={{ float: "right", marginTop: "10px" }}
      ></input>
    </form>
  );
};

export default PersonCreateForm;
