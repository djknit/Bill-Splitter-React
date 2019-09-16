import React, { Component } from 'react';
import dataService from './data';
import style from './style';
import TextInput from '../../../../../form-pieces/text-input';

class NameInput extends Component {
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

  handleChange(value) {
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
    const inputId = formId + '-name';

    return (
      <TextInput
        inputRef={inputRef}
        label="Bill Name"
        sublabel="Optional"
        placeholder="Give the bill a nickname..."
        value={inputValue}
        handleChange={this.handleChange}
        formId={formId}
        name="name"
      />
      // <div className="field">
      //   <label htmlFor={inputId} className="label">
      //     Bill Name <span style={style.normalWeight}>(Optional)</span>
      //   </label>
      //   <div className="control">
      //     <input
      //       id={inputId}
      //       ref={inputRef}
      //       className="input"
      //       placeholder="Give the bill a nickname..."
      //       onChange={this.handleChange}
      //       value={inputValue}
      //     />
      //   </div>
      // </div>
    );
  }
}

export default NameInput;