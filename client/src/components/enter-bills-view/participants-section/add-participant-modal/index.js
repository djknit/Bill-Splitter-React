import React, { Component } from 'react';
import ModalSkeleton from '../../modal-skeleton';
import { participantsService } from '../../data/entities';
import style from './style';

const defaultState = {
  hasSuccess: false,
  hasProblem: false,
  inputValue: '',
  hasInputProblem: false,
  newParticipantName: null,
  errorMessage: null
};

class AddParticipantModal extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.cancelButtonRef = React.createRef();
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
      inputRef
    } = this.props;
    const {
      hasSuccess,
      hasProblem,
      inputValue,
      hasInputProblem,
      newParticipantName,
      errorMessage
    } = this.state;

    return (
      <ModalSkeleton
        title="Add Participant"
        isActive={isActive}
        closeModal={closeModal}
        hasSuccess={hasSuccess}
        reset={this.reset}
        footerContent={
          hasSuccess ? (
              <button
                className="button is-info"
                onClick={() => this.reset(true)}
              >
                Add Another Participant
              </button>
            ) : (
              <button
                className="button is-success"
                type="submit"
                disabled={!inputValue}
                form="add-participant-form"
              >
                Submit
              </button>
            )
        }
        cancelButtonRef={this.cancelButtonRef}
      >

        {hasSuccess ?
          <div className="notification is-success">
            <h5 className="title is-5" style={style.notificationTitle}>
              Success!
            </h5>
            <p>
              <span style={style.name}>
                {newParticipantName}
              </span> was added to the participants for this list.
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
              className={`input ${hasInputProblem ? 'is-danger' : ''}`}
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