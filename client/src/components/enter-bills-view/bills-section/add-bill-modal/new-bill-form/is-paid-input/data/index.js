import DataServiceFactory from '../../../../../../../utilities/data-service-factory';
import payerSingleService from '../payer-single-input/data';
import payersMultipleService from '../payers-multiple-inputs/data';
import { participantsService } from '../../../../../data/entities';

let participants = [];

let inputValue = {
  isPaid: false,
  oneOrMore: 'one',
  payerSingle: payerSingleService.getValue(),
  payersMultiple: payersMultipleService.getValue()
};

let dataService = DataServiceFactory({
  readFunction() {
    const { isPaid, oneOrMore, payerSingle, payersMultiple } = inputValue;
    return {
      isPaid,
      oneOrMore,
      numberOfParticipants: participants.length,
      payerSingle: { ...payerSingle },
      payersMultiple: payersMultiple.map(input => ({ ...input }))
    };
  },
  methods: {
    update(property, value) {
      if (property === 'isPaid') {
        inputValue[property] = value ? true : false;
      }
      else if(property === 'oneOrMore') {
        inputValue[property] = value; 
      }
    },
    reset() {
      inputValue.isPaid = true;
    }
  },
  isAsync: false
});


getParticipants();
participantsService.subscribe(getParticipants);

function getParticipants() {
  participantsService
    .getValue()
    .then(val => {
      participants = val;
      dataService._emit();
    });
}

getPayerSingle();
payerSingleService.subscribe(getPayerSingle);

function getPayerSingle() {
  inputValue.payerSingle = payerSingleService.getValue();
  dataService._emit();
}

getPayersMultiple();
payersMultipleService.subscribe(getPayersMultiple);

function getPayersMultiple() {
  inputValue.payersMultiple = payersMultipleService.getValue();
  dataService._emit();
}

export default dataService;