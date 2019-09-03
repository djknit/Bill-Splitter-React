import EntitiesFactory from './EntitiesFactory';

const participantsService = EntitiesFactory('participant');
const agentsService = EntitiesFactory('agent');

export { participantsService, agentsService };
export default {
  participantsService,
  agentsService
};