// Creates data stores for both types of entities, 'entities' and 'agents' (billers)
export default function EntitiesFactory(entityType) {
  const EventEmitter = require('events');
  const emitter = new EventEmitter();

  let entities = [];
  let nextEntityId = 1;

  function addEntity(newEntityName) {
    const isParticipant = entityType === 'participant';
    const trimmedName = newEntityName.trim();
    return new Promise(
      (resolve, reject) => {
        if (isDuplicate(trimmedName, entities)) {
          return reject({
            message: 'There is already ' + (isParticipant ? 'a ' : 'an ') + entityType +
              ' in this list with the name "' + trimmedName + '." If you have two ' +
              entityType + 's with the same name, you must add a number or other ' +
              'marker so that they can be identified.'
          });
        }
        const newEntity = {
          name: trimmedName,
          id: nextEntityId++
        };
        entities.push(newEntity);
        resolve(newEntity);
        emitter.emit('change');
      }
    );
  }

  function isDuplicate(newEntityName, entitiesArray) {
    for (let i = 0; i < entitiesArray.length; i++) {
      if (entitiesArray[i].name === newEntityName) {
        return true;
      }
    }
    return false;
  }

  function removeEntity(id) {
    return new Promise(
      (resolve, reject) => {
        for (let i = 0; i < entities.length; i++) {
          if (entities[i].id === id) {
            const removedParticipantName = entities[i].name;
            entities.splice(i, 1);
            // console.log(entities);
            return resolve(removedParticipantName);
          }
        }
        reject({ message: 'Sorry, that participant could not be found. Please try again.' });
      }
    );
  }

  return {
    get value() {
      return entities.map(entity => Object.assign({}, entity));
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
    add: addEntity,
    remove: removeEntity
  };
}