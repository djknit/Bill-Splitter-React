import React, { Component } from 'react';
import style from './style';
import { participantsService } from '../data/entities'
import PageSection from '../page-section';
import ParticipantCard from './participant-card';
import AddParticipantModal from './add-participant-modal';
import RemoveThingModal from '../remove-thing-modal';

participantsService.add('Dave');

class ParticipantsSection extends Component {
  constructor() {
    super();
    this.getParticipants = this.getParticipants.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.focusModalInput = this.focusModalInput.bind(this);
    this.focusModalCancelBtn = this.focusModalCancelBtn.bind(this);
    this.modalInputRef = React.createRef();
    this.modalCancelBtnRef = React.createRef();
    this.state = {
      participants: [],
      isAddPModalActive: false,
      isRemovePModalActive: false,
      participantToRemove: null
    };
  }

  getParticipants() {
    participantsService
      .getValue()
      .then(participants => this.setState({ participants }));
  }

  toggleModal(addOrRemove, isActive, participant) {
    console.log(participant)
    const isAdd = addOrRemove === 'add';
    const propertyToSet = isAdd ? 'isAddPModalActive' : 'isRemovePModalActive';
    if (isActive && isAdd) this.focusModalInput();
    else if (isActive) this.focusModalCancelBtn();
    this.setState({
      [propertyToSet]: isActive,
      participantToRemove: participant || null
    });
  }

  focusModalInput() {
    const self = this;
    setTimeout(() => self.modalInputRef.current.focus(), 250);
  }

  focusModalCancelBtn() {
    const self = this;
    setTimeout(() => self.modalCancelBtnRef.current.focus(), 250);
  }

  componentDidMount() {
    this.getParticipants();
    participantsService.subscribe(this.getParticipants);
  }

  componentWillUnmount() {
    participantsService.unsub(this.getParticipants);
  }

  render() {
    const {
      participants,
      isAddPModalActive,
      isRemovePModalActive,
      participantToRemove
    } = this.state;

    return (
      <>
        <PageSection
          type="Participant"
          openModal={() => this.toggleModal('add', true)}
        >
          {participants.length > 0 ?
            participants.map(
              (participant, index) => <ParticipantCard
                participant={participant}
                openRemoveParticipantModal={() => this.toggleModal('remove', true, participant)}
                key={participant.id}
                isFirst={index === 0}
              />
            ) :
            <p style={style.emptySectionText}>
              There are no participants in this list yet. Click the "Add" button below to add participants.
            </p>
          }
        </PageSection>
        <AddParticipantModal
          isActive={isAddPModalActive}
          closeModal={() => this.toggleModal('add', false)}
          inputRef={this.modalInputRef}
          focusInput={this.focusModalInput}
        />
        <RemoveThingModal
          thingType="participant"
          isActive={isRemovePModalActive}
          closeModal={() => this.toggleModal('remove', false)}
          cancelButtonRef={this.modalCancelBtnRef}
          thingsService={participantsService}
          thingToRemove={participantToRemove}
        />
      </>
    );
  }
}

export default ParticipantsSection;