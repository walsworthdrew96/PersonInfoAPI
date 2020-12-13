import React, { useState, useEffect, useCallback } from "react";
// import { Button, ButtonGroup, Container } from "react-bootstrap";
// import { Highlight, Loading } from "../components";
// import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import Table from "../components/Table/Table";
import PersonCreateForm from "../components/PersonCreateForm/PersonCreateForm";
import PersonChangeForm from "../components/PersonChangeForm/PersonChangeForm";
import DbSelectionForm from "../components/DbSelectionForm/DbSelectionForm";

// const [message, setMessage] = useState("");

// const { getAccessTokenSilently } = useAuth0();

// const callAPI = async () => {
//   try {
//     const response = await fetch("http://localhost:7000/api/public-message");
//     const responseData = await response.json();

//     setMessage(responseData);
//   } catch (error) {
//     setMessage(error.message);
//   }
// };

// const callSecureAPI = async () => {
//   try {
//     const token = await getAccessTokenSilently();

//     const response = await fetch(`https://localhost:7000/api/private-message`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const responseData = await response.json();
//     setMessage(responseData);
//   } catch (error) {
//     setMessage(error.message);
//   }
// };

const PersonAPI = (props) => {
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
  // get the access token for usage throughout the api calling functions
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
    console.log("newPerson:", newPerson);
    setSelectedPerson(newPerson);
  };

  // When a Person table row is clicked.
  const onPersonSelectionClick = (e, person) => {
    let eventPersonRow = e.currentTarget;
    e.persist();
    if (selectedPersonRow !== {}) {
      eventPersonRow.style = {};
    }
    eventPersonRow.style = { backgroundColor: "blue" };
    console.log("Selected Table Row:", eventPersonRow);
    console.log("Selected Person:", person);
    setSelectedPerson(person);
    setSelectedPersonRow(eventPersonRow);
  };

  const deselectPersonOnClick = (e) => {
    setSelectedPerson({ id: "", firstName: "", lastName: "" });
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(
          `${axios.defaults.baseURL}/api/person?dbSelection=${dbSelection}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("response from async await:", await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, dbSelection]);

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
          // console.log("response from async await:", await response.json());
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
              // this.operationCancelHandler(null);
              console.log("POST response.data:", response.data);
              getAllPeople();
              return response.data;
            })
            .catch((error) => {
              // this.operationCancelHandler(null);
              console.log("POST error:", error);
              setMessage(error.message);
              setError(true);
            });
          // console.log("response from async await:", await response.json());
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
              // this.operationCancelHandler(null);
              console.log("PUT response.data:", response.data);
              getAllPeople();
              return response.data;
            })
            .catch((error) => {
              // this.operationCancelHandler(null);
              console.log("PUT error:", error);
              setMessage(error.message);
              setError(true);
            });
          // console.log("response from async await:", await response.json());
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
              // this.operationCancelHandler(null);
              console.log("DELETE response.data:", response.data);
              getAllPeople();
              return response.data;
            })
            .catch((error) => {
              // this.operationCancelHandler(null);
              console.log("DELETE error:", error);
              setError(true);
            });
          // console.log("response from async await:", await response.json());
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
  // if we have a person selected, render the edit/delete form
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
      <div className="container-fluid">
        <div className="row bg-white">
          <div className="col-md-3 col-sm-12">{PersonForm}</div>
          <main className="col-md-9 col-sm-12">
            <div className="row bg-white">
              <div className="col-md-12">
                <DbSelectionForm
                  dbSelection={dbSelection}
                  onDbSelectionChange={onDbSelectionChange}
                />
              </div>
            </div>
            <div className="row bg-white">
              <p>{message}</p>
              <p style={{ color: "red" }}>{error}</p>
              <Table
                people={people}
                loading={loading}
                onPersonSelectionClick={onPersonSelectionClick}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PersonAPI;
