import React, { Component } from 'react';
import style from './style';
import { participantsService } from '../data/entities'
import PageSection from '../page-section';
import ParticipantCard from './participant-card';
import AddParticipantModal from './add-participant-modal';

participantsService.add('Dave');

class ParticipantsSection extends Component {
  constructor() {
    super();
    this.getParticipants = this.getParticipants.bind(this);
    this.setModalIsActive = this.setModalIsActive.bind(this);
    this.state = {
      participants: participantsService.value,
      isModalActive: false
    };
  }

  getParticipants() {
    this.setState({
      participants: participantsService.value
    });
  }

  setModalIsActive(isActive) {
    this.setState({
      isModalActive: isActive
    });
  }

  componentDidMount() {
    participantsService.subscribe(this.getParticipants);
  }

  componentWillUnmount() {
    participantsService.unsub(this.getParticipants);
  }
2
  render() {
    const { participants, isModalActive } = this.state;

    return (
      <>
        <PageSection
          type="Participant"
          openModal={() => this.setModalIsActive(true)}
        >
          {participants.map(
            participant => <ParticipantCard
              participant={participant}
              key={participant.id}
            />
          )}
        </PageSection>
        <AddParticipantModal
          isActive={isModalActive}
          closeModal={() => this.setModalIsActive(false)}
        />
      </>
    );
  }
}

export default ParticipantsSection;