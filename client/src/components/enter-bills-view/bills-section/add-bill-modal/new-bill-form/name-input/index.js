import React, { Component } from 'react';
import dataService from './data';
import style from './style';

class nameInput extends Component {
  constructor(props) {
    super(props);
    this.getInputValue = this.getInputValue.bind(this);
    this.reportChange = this.reportChange.bind(this);
    this.state = {
      inputValue: dataService.getValue()
    }
  }

  getInputValue() {
    this.setState({
      inputValue: dataService.getValue()
    });
  }

  reportChange(newValue) {
    dataService.update(newValue);
  }

  componentDidMount() {
    dataService.subscribe(this.getInputValue);
  }

  componentWillUnmount() {
    dataService.unsub(this.getInputValue);
  }

  render() {
    const { formId } = this.props;
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
            className="input"
            placeholder="Give the bill a nickname..."
            onChange={this.reportChange}
            value={inputValue}
          />
        </div>
      </div>
    );
  }
}

export default nameInput;