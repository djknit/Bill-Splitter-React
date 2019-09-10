const EventEmitter = require('events');
const emitter = new EventEmitter();

let bills = [];
let nextBillbillId = 1;

export default {
  getValue() {
    return new Promise((resolve, reject) => {
      resolve(bills.map(bill => Object.assign({}, bill)));
    });
  },
  subscribe(callback) {
    emitter.on(
      'change',
      callback
    );
  },
  unsub(callback) {
    emitter.removeListener(
      'change',
      callback
    );
  },
  add(newBill) {
    bills.push(newBill);
  },
  remove(billId) {
    return new Promise(
      (resolve, reject) => {
        for (let i = 0; i < bills.length; i++) {
          if (bills[i].billId === billId) {
            const { name, amount } = bills[i];
            const removedBill = {
              name,
              amount,
              id: billId
            }
            bills.splice(i, 1);
            resolve(removedBill);
            emitter.emit('change');
          }
        }
        reject({ message: 'Sorry, that bill could not be found. Please try again.' });
      }
    );
  }
}