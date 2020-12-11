import React, { Component } from "react";

class DbSelectionRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: "msSqlConnection" };
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
  }

  render() {
    return (
      <div className="radio">
        <label>
          <input
            type="radio"
            value={this.props.value}
            checked={this.state.selectedOption === this.props.value}
            onChange={this.onValueChange}
          />
          {this.props.text}
        </label>
      </div>
    );
  }
}

export default DbSelectionRadioButton;
