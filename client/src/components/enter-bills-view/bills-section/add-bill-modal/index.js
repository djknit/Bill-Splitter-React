import React, { Component } from 'react';
import style from './style';
import ModalSkeleton from '../../modal-skeleton';
import { participantsService } from '../../data/entities';

const defaultState = {
  hasSuccess: false,
  hasProblem: false,
  errorMessage: null
};

class AddBillModal extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.state = defaultState;
  }

  reset() {
    this.setState(defaultState);
  }

  submit(event) {
    event.preventDefault();
  }

  render() {
    const {
      isActive,
      closeModal
    } = this.props;
    const {
      hasSuccess,
      hasProblem,
      errorMessage
    } = this.state;

    return (
      <ModalSkeleton
        title="Add Bill"
        isActive={isActive}
        closeModal={closeModal}
        hasSuccess={hasSuccess}
        reset={this.reset}
        footerContent={<></>}
      >

        {hasSuccess ?
          <div className="notification is-success">
            <h5 className="title is-5" style={style.notificationTitle}>
              Success!
            </h5>
            <p>
              The bill has been added.
            </p>
          </div> :
          hasProblem &&
            <div className="notification is-danger">
              <h5 className="title is-5" style={style.notificationTitle}>
                Error
              </h5>
              <p>
                {errorMessage || <>An unknown error has occurred. Please try again.</>}
              </p>
            </div>
        }

        <form id="add-bill-form" onSubmit={this.submit}>

        </form>

      </ModalSkeleton>
    );
  }
}

export default AddBillModal;