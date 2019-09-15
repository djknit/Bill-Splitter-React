import React, { Component } from 'react';
import dataService from './data';
import style from './style';

class nameInput extends Component {
  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputValue: dataService.getValue()
    }
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
  }

  handleChange(event) {
    const { value } = event.target;
    dataService.update(value);
  }

  componentDidMount() {
    dataService.subscribe(this.getInputValue);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValue);
  }

  render() {
    const { formId, inputRef } = this.props;
    const { inputValue } = this.state;
    const inputId = formId + '-name-in';

    return (
      <div className="field">
        <label htmlFor={inputId} className="label">
          Bill Name <span style={style.normalWeight}>(Optional)</span>
        </label>
        <div className="control">
          <input
            id={inputId}
            ref={inputRef}
            className="input"
            placeholder="Give the bill a nickname..."
            onChange={this.handleChange}
            value={inputValue}
          />
        </div>
      </div>
    );
  }
}

export default nameInput;