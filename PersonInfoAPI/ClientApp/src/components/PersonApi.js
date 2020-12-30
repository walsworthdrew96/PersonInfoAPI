import React, { useState, useEffect, useCallback } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import Table from "./Table";
import PersonCreateForm from "./PersonCreateForm";
import PersonChangeForm from "./PersonChangeForm";
import DbSelectionForm from "./DbSelectionForm";

const PersonApi = (props) => {
  const [dbSelection, setDbSelection] = useState("azureSqlConnection");
  const [selectedPerson, setSelectedPerson] = useState({
    id: "",
    firstName: "",
    lastName: "",
  });
  const [selectedPersonRow, setSelectedPersonRow] = useState({});
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  // Get the access token for usage in the API calling functions.
  const { getAccessTokenSilently } = useAuth0();

  // When a new DB is selected from one of the radio buttons.
  const onDbSelectionChange = (e) => {
    setDbSelection(e.target.value);
  };

  // When a Person form field is changed.
  const onPersonInputChange = (e) => {
    let newPerson = { ...selectedPerson };
    if (e.target.id === "IdInput") {
      newPerson.id = e.target.value;
    }
    if (e.target.id === "FirstNameInput") {
      newPerson.firstName = e.target.value;
    }
    if (e.target.id === "LastNameInput") {
      newPerson.lastName = e.target.value;
    }
    setSelectedPerson(newPerson);
  };

  // When a Person table row is clicked.
  const selectPersonOnClick = (e, person) => {
    let eventPersonRow = e.currentTarget;
    e.persist();
    if (selectedPersonRow !== {}) {
      eventPersonRow.style = {};
    }
    eventPersonRow.style = { backgroundColor: "blue" };
    setSelectedPerson(person);
    setSelectedPersonRow(eventPersonRow);
  };

  const deselectPersonOnClick = (e) => {
    setSelectedPerson({ id: "", firstName: "", lastName: "" });
  };

  const getAllPeople = useCallback(
    (e) => {
      if (e !== undefined) {
        e.preventDefault();
      }
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          axios
            .get(`/api/person?dbSelection=${dbSelection}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setPeople(response.data);
              setLoading(false);
            })
            .catch((error) => {
              setMessage(error.message);
              setError(true);
            });
        } catch (e) {
          console.error(e);
        }
      })();
    },
    [getAccessTokenSilently, dbSelection]
  );

  // Run getAllPeople and set loading to false the first time this component is rendered.
  useEffect(() => {
    getAllPeople();
    setLoading(false);
  }, [getAllPeople]);

  const createPersonFormSubmit = useCallback(
    (e) => {
      if (e !== undefined) {
        e.preventDefault();
      }
      setLoading(true);
      // POST a Person with authorization
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          axios
            .post(
              `/api/person?dbSelection=${dbSelection}`,
              {
                firstName: selectedPerson.firstName,
                lastName: selectedPerson.lastName,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              getAllPeople();
              return response.data;
            })
            .catch((error) => {
              setMessage(error.message);
              setError(true);
            });
        } catch (e) {
          console.error(e);
        }
      })();
    },
    [getAccessTokenSilently, dbSelection, getAllPeople, selectedPerson]
  );

  const editPersonOnClick = useCallback(
    (e) => {
      if (e !== undefined) {
        e.preventDefault();
      }
      setLoading(true);
      // PUT a Person
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          axios
            .put(
              `/api/person/${selectedPerson.id}?dbSelection=${dbSelection}`,
              {
                id: selectedPerson.id,
                firstName: selectedPerson.firstName,
                lastName: selectedPerson.lastName,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              getAllPeople();
              return response.data;
            })
            .catch((error) => {
              setMessage(error.message);
              setError(true);
            });
        } catch (e) {
          console.error(e);
        }
      })();
    },
    [getAccessTokenSilently, dbSelection, getAllPeople, selectedPerson]
  );

  const deletePersonOnClick = useCallback(
    (e) => {
      if (e !== undefined) {
        e.preventDefault();
      }
      // DELETE a Person
      (async () => {
        try {
          const token = await getAccessTokenSilently();
          axios
            .delete(
              `/api/person/${selectedPerson.id}?dbSelection=${dbSelection}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((response) => {
              getAllPeople();
              return response.data;
            })
            .catch((error) => {
              setError(true);
            });
        } catch (e) {
          console.error(e);
        }
      })();
    },
    [getAccessTokenSilently, dbSelection, getAllPeople, selectedPerson]
  );
  let PersonForm = (
    <PersonCreateForm
      selectedPerson={selectedPerson}
      onPersonInputChange={onPersonInputChange}
      createPersonFormSubmit={createPersonFormSubmit}
    />
  );
  // If we have a person selected, render the edit/delete form.
  if (selectedPerson.id !== "") {
    PersonForm = (
      <PersonChangeForm
        selectedPerson={selectedPerson}
        onPersonInputChange={onPersonInputChange}
        editPersonOnClick={editPersonOnClick}
        deletePersonOnClick={deletePersonOnClick}
        deselectPersonOnClick={deselectPersonOnClick}
      />
    );
  }

  return (
    <>
      <Container>
        <Row className="bg-white">
          <Col md="3" sm="12">
            {PersonForm}
          </Col>
          <Col md="9" sm="12">
            <Row className="bg-white">
              <Col md="12">
                <DbSelectionForm
                  dbSelection={dbSelection}
                  onDbSelectionChange={onDbSelectionChange}
                />
              </Col>
            </Row>
            <Row className="bg-white">
              <p>{message}</p>
              <p style={{ color: "red" }}>{error}</p>
              <Table
                people={people}
                loading={loading}
                selectPersonOnClick={selectPersonOnClick}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PersonApi;
