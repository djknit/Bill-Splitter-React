// I got the general idea that I am using for these data stores from the following source.
// https://codeutopia.net/blog/2016/02/01/react-application-data-flow-where-and-how-to-store-your-data/
// This source also introduced me to the 'events' module and it's usage.

const EventEmitter = require('events');

export default function DataServiceFactory({
  readFunction,
  methods,
  isAsync
}) {

  const emitter = new EventEmitter();

  let dataService = {
    getValue: readFunction,
    subscribe(callback) {
      emitter.on('change', callback);
      return () => this.unsub(callback);
    },
    unsub(callback) {
      emitter.removeListener('change', callback);
    },
    _emit() {
      emitter.emit('change');
    }
  };

  const methodKeys = Object.keys(methods);

  // copy methods to dataService so that event emitter is triggered when methods are called
  // methods should all be synchronous or all asynchronous but NOT a mix of both
  methodKeys.forEach(methodKey => {
    dataService[methodKey] = function(...args) {
      if (isAsync) {
        return new Promise((resolve, reject) => {
          methods[methodKey](...args)
            .then(result => {
              emitter.emit('change');
              resolve(result);
            })
            .catch(reject);
        });
      }
      else {
        const result = methods[methodKey](...args);
        emitter.emit('change');
        return result;
      }
    };
  });

  return dataService;

};