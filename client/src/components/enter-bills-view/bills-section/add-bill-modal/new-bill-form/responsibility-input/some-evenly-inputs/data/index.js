import { DataServiceFactory, AmountValueStoreFactory } from '../../../../../../../../utilities';
import { participantsService } from '../../../../../../data/entities';

let inputValues = [];
reset();

function reset() {
  inputValues = [];
}

let dataService = DataServiceFactory({
  readFunction() {
    return inputValues.map(value => value);
  },
  methods: {

  },
  isAsync: false
});

export default dataService;