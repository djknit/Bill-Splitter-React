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
    this.toggleModal = this.toggleModal.bind(this);
    this.focusModalInput = this.focusModalInput.bind(this);
    this.focusModalCancelBtn = this.focusModalCancelBtn.bind(this);
    this.modalInputRef = React.createRef();
    this.modalCancelBtnRef = React.createRef();
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
      .getValue()
      .then(bills => this.setState({ bills }));
  }

  getParticipants() {
    participantsService
      .getValue()
      .then(participants => this.setState({ participants }));
  }

  toggleModal(addOrRemove, isActive, bill) {
    // console.log(bill)
    const isAdd = addOrRemove === 'add';
    const propertyToSet = isAdd ? 'isAddBillModalActive' : 'isRemoveBillModalActive';
    if (isActive && isAdd) this.focusModalInput();
    else if (isActive) this.focusModalCancelBtn();
    this.setState({
      [propertyToSet]: isActive,
      billToRemove: bill || null
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
          openModal={() => this.toggleModal('add', true)}
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
          closeModal={() => this.toggleModal('add', false)}
          inputRef={this.modalInputRef}
          focusInput={this.focusModalInput}
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