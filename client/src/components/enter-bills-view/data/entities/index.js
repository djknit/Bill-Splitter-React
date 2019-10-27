import EntitiesFactory from './EntitiesFactory';

const participantsService = EntitiesFactory('participant');
const agentsService = EntitiesFactory('agent');

agentsService.add('biller Dave');
agentsService.add('Dave the Biller');

export { participantsService, agentsService };
export default {
  participantsService,
  agentsService
};