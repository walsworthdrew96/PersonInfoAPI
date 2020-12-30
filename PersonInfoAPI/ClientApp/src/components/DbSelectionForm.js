import React from "react";
import { Form } from "react-bootstrap";

const DbSelectionForm = ({ dbSelection, onDbSelectionChange }) => {
  const formSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h4>Table View Selection</h4>
      <Form className="form-check form-check-inline" onSubmit={formSubmit}>
        {/* <div className="radio" style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="Text File"
            checked={dbSelection === "Text File"}
            disabled={true}
            onChange={onDbSelectionChange}
          />
          <label className="form-check-label">Text File</label>
        </div>
        <div className="radio" style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="Excel File"
            checked={dbSelection === "Excel File"}
            disabled={true}
            onChange={onDbSelectionChange}
          />
          <label className="form-check-label">Excel File</label>
        </div>
        <div className="radio" style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="msAccessConnection"
            checked={dbSelection === "msAccessConnection"}
            disabled={true}
            onChange={onDbSelectionChange}
          />
          <label className="form-check-label">MS Access DB</label>
        </div> */}
        <div className="radio" style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="azureSqlConnection"
            checked={dbSelection === "azureSqlConnection"}
            onChange={onDbSelectionChange}
          />
          <label className="form-check-label">Azure SQL DB</label>
        </div>
      </Form>
      {/* <div style={{ float: "right" }}>
        Selected option is: <strong>{dbSelection}</strong>
      </div> */}
    </>
  );
};

export default DbSelectionForm;
