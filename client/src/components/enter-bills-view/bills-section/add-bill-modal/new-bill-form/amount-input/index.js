import React, { Component } from 'react';
import dataService from './data';
import style from './style';

class AmountInput extends Component {
  constructor(props) {
    super(props);
    this.getDataValues = this.getDataValues.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.state = {
      dataValues: dataService.getValue()
    }
  }

  getDataValues() {
    this.setState({
      dataValues: dataService.getValue()
    });
  }

  handleChange(event) {
    dataService.update(event.target.value);
  }

  reset() {

  }

  componentDidMount() {
    dataService.subscribe(this.getDataValues);
  }

  componentWillUnmount() {
    dataService.unsub(this.getDataValues);
  }

  render() {
    const { formId } = this.props;
    const { dataValues } = this.state;
    const inputId = formId + '-amount-in';

    return (
      <div className="field" style={style.field}>
        <label htmlFor={inputId} className="label">
          Bill Total <span style={style.normalWeight}>(US Dollars)</span>
        </label>
        <div className="control">
          <input
            id={inputId}
            className="input"
            type="number"
            style={style.input}
            value={dataValues.raw}
            onChange={this.handleChange}
          />
        </div>
        {
          dataValues.display === 'negative' && (
            <div style={style.amountDisplayNegative}>
              Negative values are not allowed
            </div>
          ) || dataValues.display !== null && (
            <div style={style.amountDisplay}>
              $ {dataValues.display}
            </div>
          )
        }
      </div>
    );
  }
}

export default AmountInput