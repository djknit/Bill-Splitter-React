import React, { Component } from 'react';
// import { participantsService } from '../../data/entities';
import ModalSkeleton from '../../modal-skeleton';
import NewBillForm from './new-bill-form';
import formDataService from './new-bill-form/data';

class AddBillModal extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.cancel = this.cancel.bind(this);
    this.getData = this.getData.bind(this);
    this.cancelButtonRef = React.createRef();
    this.state = formDataService.getValue();
  }

  reset() {
    formDataService.reset();
  }

  cancel() {
    this.props.closeModal();
    this.reset();
  }

  getData() {
    this.setState(formDataService.getValue());
  }

  componentDidMount() {
    formDataService.subscribe(this.getData);
  }

  componentWillUnmount() {
    formDataService.unsub(this.getData)
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