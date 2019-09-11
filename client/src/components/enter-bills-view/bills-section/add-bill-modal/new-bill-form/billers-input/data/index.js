import DataServiceFactory from '../../../../../../../utilities/data-service-factory';

let inputValue = {
  
};

let dataService = DataServiceFactory({
  readFunction() {
    return Object.assign({}, inputValue);
  },
  methods: {
    update() {
      
    }
  },
  isAsync: false
});