import React, { Component } from 'react';
import dataService from './data';
import style from './style';
import { AmountInput } from '../../../../../form-pieces';

class BillAmountInput extends Component {
  constructor(props) {
    super(props);
    this.getDataValues = this.getDataValues.bind(this);
    this.state = {
      dataValues: dataService.getValue()
    }
  }

  getDataValues() {
    this.setState({
      dataValues: dataService.getValue()
    });
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

    return (
      <AmountInput
        value={dataValues}
        handleChange={dataService.update}
        formId={formId}
        name="amount"
        label="Bill Total"
        sublabel="US Dollars"
      />
      // <div className="field" style={style.field}>
      //   <label htmlFor={inputId} className="label">
      //     Bill Total <span style={style.normalWeight}>(US Dollars)</span>
      //   </label>
      //   <div className="control has-icons-left">
      //     <input
      //       id={inputId}
      //       className="input"
      //       type="number"
      //       style={style.input}
      //       value={dataValues.raw}
      //       onChange={this.handleChange}
      //     />
      //     <span className="icon is-left">$</span>
      //   </div>
      //   {
      //     (dataValues.display === 'negative' && (
      //       <div style={style.amountDisplayNegative}>
      //         Negative values are not allowed
      //       </div>
      //     )) || (dataValues.display !== null && (
      //       <div style={style.amountDisplay}>
      //         $ {dataValues.display}
      //       </div>
      //     ))
      //   }
      // </div>

    );
  }
}

export default BillAmountInput