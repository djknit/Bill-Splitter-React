import getEnterBillsViewStyle from '../style';

const { shadow } = getEnterBillsViewStyle();

export default {
  card: Object.assign(
    {
      marginBottom: 20
    },
    shadow
  ),
  cardContent: {
    minHeight: 100
  },
  cardFooter: {
    textAlign: 'right',
    display: 'block',
    padding: 10
  },
  addParticipant: {
    display: 'inline-block',
    height: 'auto'
  }
};