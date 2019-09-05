import React, { Component } from 'react';
import ModalSkeleton from '../../modal-skeleton';
import { participantsService } from '../../data/entities';

class AddParticipantModal extends Component {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = {
      hasSuccess: false,
      hasProblem: false,
      inputValue: ''
    };
  }

  cancel() {
    this.setState({
      hasSuccess: false,
      inputValue: ''
    });
    this.props.closeModal();
  }

  handleInputChange(event) {
    const { value } = event.target;
    this.setState({
      inputValue: value
    });
  }

  submit(event) {
    event.preventDefault();
    console.log('submit')
    participantsService
      .add(this.state.inputValue)
      .then(newP => {
        console.log('new participant');
        console.log(newP);
        this.setState({
          hasSuccess: true
        });
      });
  }

  render() {
    const {
      isActive,
      closeModal
    } = this.props;
    const {
      hasSuccess,
      hasProblem,
      inputValue
    } = this.state;

    return (
      <ModalSkeleton
        title="Add Participant"
        isActive={isActive}
        closeModal={closeModal}
        hasSuccess={hasSuccess}
        hasDanger={hasProblem}
        cancel={this.cancel}
        footerContent={
          hasSuccess ?
            <button
              className="button is-primary"
            >
              Add Another Participant
            </button> :
            <button
              className="button is-success"
              type="submit"
            >
              Submit
            </button>
        }
      >
        <form id="add-participant-form" onSubmit={this.submit}>
          <div className="field">
            <label className="label">
              Name
              <input
                value={inputValue}
                onChange={this.handleInputChange}
                className={`input ${(hasProblem && !hasSuccess) ? 'is-danger' : ''}`}
                placeholder="New participant name..."
                disabled={hasSuccess}
                tabIndex={isActive ? 0 : -1}
              />
            </label>
          </div>
        </form>
      </ModalSkeleton>
    );
  }
}

export default AddParticipantModal;