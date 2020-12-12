import React, { Component, Fragment } from "react";
import axios from "axios";

import Table from "../Table/Table";
import PersonCreateForm from "../PersonCreateForm/PersonCreateForm";
import PersonChangeForm from "../PersonChangeForm/PersonChangeForm";
import DbSelectionForm from "../DbSelectionForm/DbSelectionForm";

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = {
      dbSelection: "azureSqlConnection",
      selectedPerson: { id: "", firstName: "", lastName: "" },
      selectedPersonRow: {},
      people: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.getAllPeople();
    this.setState((prevState) => {
      return { ...prevState, loading: false };
    });
  }

  // When a new DB is selected from one of the radio buttons.
  onDbSelectionChange = (e) => {
    this.setState({
      dbSelection: e.target.value,
    });
  };

  // When a Person form field is changed.
  onPersonInputChange = (e) => {
    let newPerson = { ...this.state.selectedPerson };
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
    this.setState((prevState) => {
      return { ...prevState, selectedPerson: newPerson };
    });
  };

  // When a Person table row is clicked.
  onPersonSelectionClick = (e, person) => {
    let selectedPersonRow = e.currentTarget;
    e.persist();
    if (this.state.selectedPersonRow !== {}) {
      selectedPersonRow.style = {};
    }
    selectedPersonRow.style = { backgroundColor: "blue" };
    console.log("Selected Table Row:", selectedPersonRow);
    console.log("Selected Person:", person);
    this.setState((prevState) => {
      return {
        ...prevState,
        selectedPerson: person,
        selectedPersonRow: selectedPersonRow,
      };
    });
  };

  deselectPersonOnClick = (e) => {
    this.setState({ selectedPerson: { id: "", firstName: "", lastName: "" } });
  };

  getAllPeople = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    // GET all Person objects
    axios
      .get(`/api/person?dbSelection=${this.state.dbSelection}`)
      .then((response) => {
        console.log("GET response.data:", response.data);
        this.setState((prevState) => {
          return {
            ...prevState,
            people: response.data,
            loading: false,
          };
        });
      })
      .catch((error) => {
        console.log("GET error:", error);
        this.setState({ error: true });
      });
  };

  createPersonFormSubmit = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    this.setState({ loading: true });
    // POST a Person
    axios
      .post(`/api/person?dbSelection=${this.state.dbSelection}`, {
        firstName: this.state.selectedPerson.firstName,
        lastName: this.state.selectedPerson.lastName,
      })
      .then((response) => {
        // this.operationCancelHandler(null);
        console.log("POST response.data:", response.data);
        this.getAllPeople();
        return response.data;
      })
      .catch((error) => {
        // this.operationCancelHandler(null);
        console.log("POST error:", error);
        this.setState({ error: true });
      });
  };

  editPersonOnClick = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    // PUT a Person
    this.setState({ loading: true });
    // POST a Person
    axios
      .put(
        `/api/person/${this.state.selectedPerson.id}?dbSelection=${this.state.dbSelection}`,
        {
          id: this.state.selectedPerson.id,
          firstName: this.state.selectedPerson.firstName,
          lastName: this.state.selectedPerson.lastName,
        }
      )
      .then((response) => {
        // this.operationCancelHandler(null);
        console.log("PUT response.data:", response.data);
        this.getAllPeople();
        return response.data;
      })
      .catch((error) => {
        // this.operationCancelHandler(null);
        console.log("PUT error:", error);
        this.setState({ error: true });
      });
  };

  deletePersonOnClick = (e) => {
    if (e !== undefined) {
      e.preventDefault();
    }
    // DELETE a Person
    axios
      .delete(
        `/api/person/${this.state.selectedPerson.id}?dbSelection=${this.state.dbSelection}`
      )
      .then((response) => {
        // this.operationCancelHandler(null);
        console.log("DELETE response.data:", response.data);
        this.getAllPeople();
        return response.data;
      })
      .catch((error) => {
        // this.operationCancelHandler(null);
        console.log("DELETE error:", error);
        this.setState({ error: true });
      });
  };

  render() {
    let PersonForm = (
      <PersonCreateForm
        selectedPerson={this.state.selectedPerson}
        onPersonInputChange={this.onPersonInputChange}
        createPersonFormSubmit={this.createPersonFormSubmit}
      />
    );
    // if we have a person selected, render the edit/delete form
    if (this.state.selectedPerson.id !== "") {
      PersonForm = (
        <PersonChangeForm
          selectedPerson={this.state.selectedPerson}
          onPersonInputChange={this.onPersonInputChange}
          editPersonOnClick={this.editPersonOnClick}
          deletePersonOnClick={this.deletePersonOnClick}
          deselectPersonOnClick={this.deselectPersonOnClick}
        />
      );
    }
    // if (true) {
    //   PersonForm = (
    //     <PersonChangeForm
    //       selectedPerson={this.state.selectedPerson}
    //       onPersonInputChange={this.onPersonInputChange}
    //       editPersonOnClick={this.editPersonOnClick}
    //       deletePersonOnClick={this.deletePersonOnClick}
    //     />
    //   );
    // }

    return (
      <Fragment>
        <div className="container-fluid">
          <div className="row bg-white">
            <div className="col-3">{PersonForm}</div>
            <main className="col-9">
              <div className="row bg-white">
                <div className="col-12">
                  <DbSelectionForm
                    dbSelection={this.state.dbSelection}
                    onDbSelectionChange={this.onDbSelectionChange}
                  />
                </div>
              </div>
              <div className="row bg-white">
                <Table
                  people={this.state.people}
                  loading={this.state.loading}
                  onPersonSelectionClick={this.onPersonSelectionClick}
                />
              </div>
            </main>
          </div>
        </div>
      </Fragment>
    );
  }
}
