import React, { Component } from "react";

class Table extends Component {
  static displayName = Table.name;

  renderPeopleTable(people) {
    return (
      <table
        className="col-12 table table-striped"
        aria-labelledby="People Table"
      >
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person, index) => (
            <tr
              style={
                this.props.selectedPerson !== undefined &&
                this.props.selectedPerson.id === person.id
                  ? { backgroundColor: "blue" }
                  : {}
              }
              key={person.id}
              onClick={(e) =>
                this.props.onPersonSelectionClick(e, people[index])
              }
            >
              <td
                style={
                  this.props.selectedPerson !== undefined &&
                  this.props.selectedPerson.id === person.id
                    ? { backgroundColor: "blue" }
                    : {}
                }
              >
                {person.id}
              </td>
              <td
                style={
                  this.props.selectedPerson !== undefined &&
                  this.props.selectedPerson.id === person.id
                    ? { backgroundColor: "blue" }
                    : {}
                }
              >
                {person.firstName}
              </td>
              <td
                style={
                  this.props.selectedPerson !== undefined &&
                  this.props.selectedPerson.id === person.id
                    ? { backgroundColor: "blue" }
                    : {}
                }
              >
                {person.lastName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.props.loading ? (
      <p>
        <em>Loading...</em>
      </p>
    ) : (
      this.renderPeopleTable(this.props.people)
    );

    return (
      <div className="col-12">
        <h1>People</h1>
        <p>Left click on a table row to select a Person for editing or deletion.</p>
        {contents}
      </div>
    );
  }
}

export default Table;
