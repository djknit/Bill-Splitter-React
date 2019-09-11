import React, { Component } from 'react';
import style from './style';
import NameInput from './name-input';
import AmountInput from './amount-input';
// import BillersInput from './billers-input';
// import ResponsibilityInput from './responsibility-input';
// import IsPaidInput from './is-paid-input';

class NewBillForm extends Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  submit(event) {
    event.preventDefault();
  }

  render() {
    const {
      formId,
      submit,
      hasSuccess,
      hasProblem,
      errorMessage
    } = this.props;

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

        <form id={formId} onSubmit={submit}>
          <NameInput formId={formId} />
          <hr />
          <AmountInput />
          {/* <BillersInput />
          <ResponsibilityInput />
          <IsPaidInput /> */}
        </form>
      </>
    );
  }
}

export default NewBillForm;