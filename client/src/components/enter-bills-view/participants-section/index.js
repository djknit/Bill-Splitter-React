import React, { Component } from 'react';
// import style from './style';
import { participantsService } from '../data/entities'
import PageSection from '../page-section';
import ParticipantCard from './participant-card';
import AddParticipantModal from './add-participant-modal';
import RemoveParticipantModal from './remove-participant-modal';

participantsService.add('Dave');

class ParticipantsSection extends Component {
  constructor() {
    super();
    this.getParticipants = this.getParticipants.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.focusModalInput = this.focusModalInput.bind(this);
    this.modalInputRef = React.createRef();
    this.state = {
      participants: participantsService.value,
      isAddPModalActive: false,
      isRemovePModalActive: false
    };
  }

  getParticipants() {
    this.setState({
      participants: participantsService.value
    });
  }

  toggleModal(addOrRemove, isActive) {
    const isAdd = addOrRemove === 'add';
    const propertyToSet = isAdd ? 'isAddPModalActive' : 'isRemovePModalActive';
    if (isActive && isAdd) this.focusModalInput();
    this.setState({
      [propertyToSet]: isActive
    });
  }

  focusModalInput() {
    const self = this;
    setTimeout(() => self.modalInputRef.current.focus(), 250);
  }

  componentDidMount() {
    participantsService.subscribe(this.getParticipants);
  }

  componentWillUnmount() {
    participantsService.unsub(this.getParticipants);
  }

  render() {
    const {
      participants,
      isAddPModalActive,
      isRemovePModalActive
    } = this.state;

    return (
      <>
        <PageSection
          type="Participant"
          openModal={() => this.toggleModal('add', true)}
        >
          {participants.map(
            (participant, index) => <ParticipantCard
              participant={participant}
              key={participant.id}
              isFirst={index === 0}
            />
          )}
        </PageSection>
        <AddParticipantModal
          isActive={isAddPModalActive}
          closeModal={() => this.toggleModal('add', false)}
          inputRef={this.modalInputRef}
          focusInput={this.focusModalInput}
        />
        <RemoveParticipantModal
          isActive={isRemovePModalActive}
          closeModal={() => this.toggleModal('remove', false)}
        />
      </>
    );
  }
}

export default ParticipantsSection;