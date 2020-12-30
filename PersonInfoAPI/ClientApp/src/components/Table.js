import React from "react";

const Table = ({ selectedPerson, people, loading, selectPersonOnClick }) => {
  const renderPeopleTable = (people) => {
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
                selectedPerson !== undefined && selectedPerson.id === person.id
                  ? { backgroundColor: "blue" }
                  : {}
              }
              key={person.id}
              onClick={(e) => selectPersonOnClick(e, people[index])}
            >
              <td
                style={
                  selectedPerson !== undefined &&
                  selectedPerson.id === person.id
                    ? { backgroundColor: "blue" }
                    : {}
                }
              >
                {person.id}
              </td>
              <td
                style={
                  selectedPerson !== undefined &&
                  selectedPerson.id === person.id
                    ? { backgroundColor: "blue" }
                    : {}
                }
              >
                {person.firstName}
              </td>
              <td
                style={
                  selectedPerson !== undefined &&
                  selectedPerson.id === person.id
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
  };

  let contents = loading ? (
    <p>
      <em>Loading...</em>
    </p>
  ) : (
    renderPeopleTable(people)
  );

  return (
    <div className="col-12">
      <h1>People</h1>
      <p>
        Left click on a table row to select a Person for editing or deletion.
      </p>
      {contents}
    </div>
  );
};

export default Table;
