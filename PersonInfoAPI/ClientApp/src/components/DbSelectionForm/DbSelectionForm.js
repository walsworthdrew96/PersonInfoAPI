import React, { Component } from "react";

// import

class DbSelectionForm extends Component {
  render() {
    return (
      <form className="form-check form-check-inline" onSubmit={this.formSubmit}>
        {/* <div className="radio" style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="msAccessConnection"
            checked={this.props.dbSelection === "msAccessConnection"}
            onChange={this.props.onDbSelectionChange}
          />
          <label className="form-check-label">MS Access DB</label>
        </div> */}
        {/* <div className="radio" style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="msSqlConnection"
            checked={this.props.dbSelection === "msSqlConnection"}
            onChange={this.props.onDbSelectionChange}
          />
          <label className="form-check-label">SQL DB</label>
        </div> */}
        <div className="radio" style={{ marginRight: "10px" }}>
          <input
            type="radio"
            value="azureSqlConnection"
            checked={this.props.dbSelection === "azureSqlConnection"}
            onChange={this.props.onDbSelectionChange}
          />
          <label className="form-check-label">Azure SQL DB</label>
        </div>
        {/* <div>
            Selected option is: <strong>{this.props.dbSelection}</strong>
          </div> */}
      </form>
    );
  }
}

export default DbSelectionForm;
