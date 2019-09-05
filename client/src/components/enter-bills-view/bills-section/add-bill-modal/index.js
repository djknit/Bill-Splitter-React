import React, { Component } from 'react';
import ModalSkeleton from '../../modal-skeleton';

class AddBillModal extends Component {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
    this.state = {
      theme: null
    };
  }

  cancel() {
    this.setState({});
  }

  render() {
    const {
      isActive,
      closeModal
    } = this.props;
    const {
      theme
    } = this.state;

    return (
      <ModalSkeleton
        title="Add Bill"
        isActive={isActive}
        closeModal={closeModal}
        theme={theme}
        cancel={}
      >
        <form>

        </form>
      </ModalSkeleton>
    );
  }
}

export default AddBillModal;