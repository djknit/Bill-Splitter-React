import React, { Component } from 'react';
import style from './style';
import { participantsService } from '../data/entities'
import PageSection from '../page-section';
import ParticipantCard from './ParticipantCard';
import ModalSkeleton from '../modal-skeleton';

participantsService.add('Dave');

class ParticipantsSection extends Component {
  constructor() {
    super();
    this.getParticipants = this.getParticipants.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.state = {
      participants: participantsService.value,
      isModalActive: true
    };
  }

  getParticipants() {
    this.setState({
      participants: participantsService.value
    });
  }

  toggleModal(open) {
    this.setState({
      isModalActive: open
    });
  }

  componentDidMount() {
    participantsService.subscribe(this.getParticipants);
  }

  componentWillUnmount() {
    participantsService.unsub(this.getParticipants);
  }

  render() {
    const { participants, isModalActive } = this.state;
    return (
      <PageSection type="Participant" openModal>
        {participants.map(
          participant => <ParticipantCard
            participant={participant}
            key={participant.id}
          />
        )}
      </PageSection>
    );
  }
}

export default ParticipantsSection;