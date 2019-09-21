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
        hasSmallMargins
      />
    );
  }
}

export default BillAmountInput