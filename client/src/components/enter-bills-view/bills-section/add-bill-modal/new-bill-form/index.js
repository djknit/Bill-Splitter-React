import React, { Component } from 'react';
import formDataService from './data';
import style from './style';
import NameInput from './name-input';
import AmountInput from './bill-amount-input';
import BillersInput from './billers-input';
import ResponsibilityInput from './responsibility-input';
import IsPaidInput from './is-paid-input';
import dataService from './billers-input/biller-single-input/data';

class NewBillForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.getData = this.getData.bind(this);
    this.state = dataService.getValue();
  }

  submit(event) {
    event.preventDefault();
    formDataService.submit();
  }

  getData() {
    this.setState(dataService.getValue);
  }

  componentDidMount() {
    this.getData();
    formDataService.subscribe(this.getData);
  }

  componentWillUnmount() {
    formDataService.unsub(this.getData);
  }

  render() {
    const {
      formId,
      hasSuccess,
      hasProblem,
      errorMessage,
      inputRef
    } = this.props;
    const subsectionSizeRatio = .9;

    return (
      <>
        {hasSuccess ?
          (<div className="notification is-success">
            <h5 className="title is-5" style={style.notificationTitle}>
              Success!
            </h5>
            <p>
              The bill has been added.
            </p>
          </div>) :
          hasProblem && (
            <div className="notification is-danger">
              <h5 className="title is-5" style={style.notificationTitle}>
                Error
              </h5>
              <p>
                {errorMessage || <>An unknown error has occurred. Please try again.</>}
              </p>
            </div>
          )
        }

        <form id={formId} onSubmit={this.submit}>
          <NameInput formId={formId} inputRef={inputRef} />
          <Divider />
          <AmountInput formId={formId} />
          <Divider />
          <BillersInput formId={formId} subsectionSizeRatio={subsectionSizeRatio} />
          <Divider />
          <ResponsibilityInput formId={formId} subsectionSizeRatio={subsectionSizeRatio} />
          <Divider />
          <IsPaidInput formId={formId} subsectionSizeRatio={subsectionSizeRatio} />
        </form>
      </>
    );
  }
}

export default NewBillForm;

function Divider() {
  return (
    <hr style={style.divider} />
  );
}