import React, { Component } from 'react';
import pageSectionStyle from '../page-section/style';
import PageSection from '../page-section';
import billsListService from '../data/billsList';
import { participantsService } from '../data/entities';

class BillsSection extends Component {
  constructor() {
    super();
    this.getBills = this.getBills.bind(this);
    this.getParticipants = this.getParticipants.bind(this);
    this.state = {
      bills: [],
      participants: []
    };
  }

  getBills() {
    billsListService
      .getBills()
      .then(bills => this.setState({ bills }));
  }

  getParticipants() {
    participantsService
      .getValue()
      .then(participants => this.setState({ participants }));
  }

  componentDidMount() {
    this.getBills();
    this.getParticipants();
    billsListService.subscribe(this.getBills);
    participantsService.subscribe(this.getParticipants);
  }

  componentWillUnmount() {
    billsListService.unsub(this.getBills);
    participantsService.unsub(this.getParticipants);
  }

  render() {
    const { bills, participants } = this.state;

    return (
      <PageSection
        type="Bill"
        isButtonDisabled={participants.length === 0}
      >
        {(participants.length === 0 || bills.length === 0) ?
          <p style={pageSectionStyle.emptySectionText}>
            {(participants.length === 0) ?
              'You can not add bills until you have added at least one participant. It is strongly recommended that you enter all of the participants before adding any bills.' :
              'There are no bills in this list yet. Click the "Add" button below to add a bill.'
            }
          </p> :
          bills.map(bill => <h1>
            {bill}
          </h1>)
        }
      </PageSection>
    );
  }
}

export default BillsSection;