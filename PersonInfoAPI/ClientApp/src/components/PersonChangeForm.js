import React from "react";
import { Form, Button } from "react-bootstrap";

const PersonChangeForm = ({
  selectedPerson,
  onPersonInputChange,
  editPersonOnClick,
  deletePersonOnClick,
  deselectPersonOnClick,
}) => {
  return (
    <>
      <Form md="12">
        <Form.Group controlId="IdInput">
          <Form.Label>Id</Form.Label>
          <Form.Control
            type="text"
            className="form-control form-control-md"
            id="IdInput"
            aria-describedby="IdInput"
            placeholder="Id"
            value={selectedPerson.id}
            onChange={onPersonInputChange}
            disabled={true}
          ></Form.Control>
        </Form.Group>

        <Form.Label htmlFor="FirstNameInput">First Name</Form.Label>
        <Form.Control
          type="text"
          className="form-control form-control-md"
          id="FirstNameInput"
          aria-describedby="FirstNameInput"
          placeholder="First Name"
          value={selectedPerson.firstName}
          onChange={onPersonInputChange}
        ></Form.Control>
        <Form.Label htmlFor="LastNameInput">Last Name</Form.Label>
        <Form.Control
          type="text"
          className="form-control form-control-md"
          id="LastNameInput"
          aria-describedby="LastNameInput"
          placeholder="Last Name"
          value={selectedPerson.lastName}
          onChange={onPersonInputChange}
        ></Form.Control>
        <Button
          variant="warning"
          type="submit"
          value="Edit"
          onClick={editPersonOnClick}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          type="submit"
          value="Delete"
          onClick={deletePersonOnClick}
        >
          Delete
        </Button>
      </Form>
      <Button
        variant="danger"
        type="submit"
        value="Cancel"
        style={{ float: "right" }}
        onClick={deselectPersonOnClick}
      >
        Cancel
      </Button>
    </>
  );
};

export default PersonChangeForm;
