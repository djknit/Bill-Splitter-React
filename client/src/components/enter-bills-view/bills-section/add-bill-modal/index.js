import React, { Component } from 'react';
import style from './style';
import { participantsService } from '../../data/entities';
import ModalSkeleton from '../../modal-skeleton';
import NewBillForm from './new-bill-form';

const defaultState = {
  hasSuccess: false,
  hasProblem: false,
  errorMessage: null
};

class AddBillModal extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.cancelButtonRef = React.createRef();
    this.state = defaultState;
  }

  reset() {
    this.setState(defaultState);
  }

  render() {
    const {
      isActive,
      closeModal,
      inputRef
    } = this.props;
    const {
      hasSuccess,
      hasProblem,
      errorMessage
    } = this.state;
    const formId = 'add-bill-form';

    return (
      <ModalSkeleton
        title="Add Bill"
        isActive={isActive}
        closeModal={closeModal}
        hasSuccess={hasSuccess}
        reset={this.reset}
        footerContent={
          hasSuccess ? (
              <button
                className="button is-info"
                onClick={() => this.reset(true)}   //  ? ?
              >
                Add Another Bill
              </button>
            ) : (
              <button
                className="button is-success"
                type="submit"
                disabled={false}
                form={formId}
              >
                Submit
              </button>
            )
        }
        padding={15}
      >

        <NewBillForm
          formId={formId}
          hasSuccess={hasSuccess}
          hasProblem={hasProblem}
          errorMessage={errorMessage}
          inputRef={inputRef}
        />

      </ModalSkeleton>
    );
  }
}

export default AddBillModal;