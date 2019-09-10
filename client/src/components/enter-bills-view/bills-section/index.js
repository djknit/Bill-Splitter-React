import React, { Component } from 'react';
import style from './style';
import PageSection from '../page-section';
import AddBillModal from './add-bill-modal';
import RemoveThingModal from '../remove-thing-modal';
import billsListService from '../data/billsList';
import { participantsService } from '../data/entities';

class BillsSection extends Component {
  constructor() {
    super();
    this.getBills = this.getBills.bind(this);
    this.getParticipants = this.getParticipants.bind(this);
    this.state = {
      bills: [],
      participants: [],
      isAddBillModalActive: false,
      isRemoveBillModalActive: false,
      billToRemove: null
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

  toggleModal(addOrRemove, isActive, bill) {
    console.log(bill)
    const isAdd = addOrRemove === 'add';
    const propertyToSet = isAdd ? 'isAddBillModalActive' : 'isRemoveBillModalActive';
    if (isActive && isAdd) this.focusModalInput();
    else if (isActive) this.focusModalCancelBtn();
    this.setState({
      [propertyToSet]: isActive,
      billToRemove: bill || null
    });
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
    const {
      bills,
      participants,
      isAddBillModalActive,
      isRemoveBillModalActive,
      billToRemove
    } = this.state;

    return (
      <>
        <PageSection
          type="Bill"
          isButtonDisabled={participants.length === 0}
        >
          {(participants.length === 0 || bills.length === 0) ?
            <p style={style.emptySectionText}>
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
        <AddBillModal
          isActive={isAddBillModalActive}
        />
        <RemoveThingModal
          thingType="bill"
          isActive={isRemoveBillModalActive}
          closeModal={() => this.toggleModal('remove', false)}
          cancelButtonRef={this.modalCancelBtnRef}
          thingsService={billsListService}
          thingToRemove={billToRemove}
        />
      </>
    );
  }
}

export default BillsSection;