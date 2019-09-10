import React, { Component } from 'react';
import ModalSkeleton from '../modal-skeleton';
import style from './style';

const defaultState = {
  hasSuccess: false,
  hasProblem: false,
  removedThingName: null,
  errorMessage: null
};

class RemoveThingModal extends Component {
  constructor(props) {
    super(props);
    this.reset = this.reset.bind(this);
    this.submit = this.submit.bind(this);
    this.state = defaultState;
  }

  reset() {
    this.setState(defaultState);
  }

  submit() {
    const {
      thingsService,
      thingToRemove,
      cancelButtonRef
    } = this.props;

    thingsService
      .remove(thingToRemove.id)
      .then(removedThingName => {
        this.setState({
          hasSuccess: true,
          hasProblem: false,
          removedThingName,
          errorMessage: null
        });
        cancelButtonRef.current.focus();
      })
      .catch(err => {
        console.log(err);
        this.setState({
          hasProblem: true,
          errorMessage: err.message
        });
      });
  }

  render() {
    const {
      isActive,
      closeModal,
      thingToRemove,
      cancelButtonRef,
      thingType
    } = this.props;
    const {
      hasSuccess,
      hasProblem,
      removedThingName,
      errorMessage
    } = this.state;
    const thingToRemoveName = thingToRemove && thingToRemove.name;
    const capitalThingType = thingType && (thingType[0].toUpperCase() + thingType.slice(1));


    return (
      <ModalSkeleton
        title={`Remove ${capitalThingType}`}
        isActive={isActive}
        closeModal={closeModal}
        hasSuccess={hasSuccess}
        reset={this.reset}
        footerContent={
          !hasSuccess &&
            <button
              className="button is-danger"
              onClick={this.submit}
            >
              Remove
            </button>
        }
        cancelButtonRef={cancelButtonRef}
        cancelButtonSuccessText="OK"
      >

        {(hasSuccess &&
          <div className="notification is-success">
            <h5 className="title is-5" style={style.notificationTitle}>
              Success!
            </h5>
            <p>
              <span style={style.name}>
                {removedThingName}
              </span> was removed from the {thingType}s for this list.
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
              You are about to remove <span style={style.name}>{thingToRemoveName}</span>
              &nbsp;from this list's {thingType}s. You will <span style={style.bold}>not</span>
              &nbsp;be able to easily undo this action.
            </p>
          </div>
        )}

        {!hasSuccess &&
          <p>
            Are you sure you want to remove <span style={style.name}>
              {thingToRemoveName}
            </span>?
          </p>
        }

      </ModalSkeleton>
    );
  }
}

export default RemoveThingModal;