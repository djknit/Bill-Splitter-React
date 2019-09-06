import React, { Component } from 'react';
import ModalSkeleton from '../../modal-skeleton';
import { participantsService } from '../../data/entities';

class AddParticipantModal extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    // this.input = React.createRef();
    this.state = {
      hasSuccess: false,
      hasProblem: false,
      inputValue: ''
    };
  }

  reset(focus) {
    this.setState({
      hasSuccess: false,
      inputValue: ''
    });
    if (focus) this.props.focusInput();
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
      closeModal,
      inputRef
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
        reset={this.reset}
        footerContent={
          hasSuccess ?
            <button
              className="button is-info"
              onClick={() => this.reset(true)}
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
            <label className="label" htmlFor="add-participant-form-name-input">
              Name
            </label>
            <input
              id="add-participant-form-name-input"
              ref={inputRef}
              value={inputValue}
              onChange={this.handleInputChange}
              className={`input ${(hasProblem && !hasSuccess) ? 'is-danger' : ''}`}
              placeholder="New participant name..."
              disabled={hasSuccess}
              tabIndex={isActive ? 0 : -1}
            />
          </div>
        </form>
      </ModalSkeleton>
    );
  }
}

export default AddParticipantModal;