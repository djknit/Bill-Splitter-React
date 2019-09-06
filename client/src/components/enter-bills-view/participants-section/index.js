import React, { Component } from 'react';
// import style from './style';
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
    this.focusModalInput = this.focusModalInput.bind(this);
    this.modalInputRef = React.createRef();
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
    if (isActive) this.focusModalInput();
    this.setState({
      isModalActive: isActive
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
    const { participants, isModalActive } = this.state;

    return (
      <>
        <PageSection
          type="Participant"
          openModal={() => this.setModalIsActive(true)}
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
          isActive={isModalActive}
          closeModal={() => this.setModalIsActive(false)}
          inputRef={this.modalInputRef}
          focusInput={this.focusModalInput}
        />
      </>
    );
  }
}

export default ParticipantsSection;