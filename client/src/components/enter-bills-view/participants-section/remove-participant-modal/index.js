import React, { Component } from 'react';
import ModalSkeleton from '../../modal-skeleton';
import { participantsService } from '../../data/entities';
import style from './style';
console.log(style)
const defaultState = {
  hasSuccess: false,
  hasProblem: false,
  removedParticipantName: null,
  errorMessage: null
};

class AddParticipantModal extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
    this.state = defaultState;
  }

  reset(focus) {
    this.setState(defaultState);
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
          hasSuccess: true,
          hasProblem: false,
          hasInputProblem: false,
          newParticipantName: newP.name,
          errorMessage: null
        });
        this.cancelButtonRef.current.focus();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          hasProblem: true,
          hasInputProblem: err.inputProblem,
          errorMessage: err.message
        });
      });
  }

  render() {
    const {
      isActive,
      closeModal,
      participant
    } = this.props;
    const {
      hasSuccess,
      hasProblem,
      removedParticipantName,
      errorMessage
    } = this.state;
    const participantToRemoveName = participant && participant.name;

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
              ref={this.addAnotherPBtn}
            >
              Add Another Participant
            </button> :
            <button
              className="button is-danger"
              onClick={this.submit}
            >
              Remove
            </button>
        }
        cancelButtonSuccessText="OK"
      >

        {(hasSuccess &&
          <div className="notification is-success">
            <h5 className="title is-5" style={style.notificationTitle}>
              Success!
            </h5>
            <p>
              <span style={style.name}>
                {removedParticipantName}
              </span> was removed from the participants for this list.
            </p>
          </div>
        ) || (hasProblem &&
          <div className="notification is-danger">
            <h5 className="title is-5" style={style.notificationTitle}>
              Error
            </h5>
            <p>
              {errorMessage || <>An unknown error has occurred. Please try again.</>}
            </p>
          </div>
        ) || (
          <div className="notification is-danger">
            <h5 className="title is-5" style={style.notificationTitle}>
              Warning
            </h5>
            <p>
              You are about to remove <span style={style.name}>{participantToRemoveName}</span>
              from this list's participants. You will <span style={style.bold}>not</span>
              be able to easily undo this action.
            </p>
          </div>
        )}

        <p>
          Are you sure you want to remove <span style={style.name}>
            {participantToRemoveName}
          </span>?
        </p>

      </ModalSkeleton>
    );
  }
}

export default AddParticipantModal;