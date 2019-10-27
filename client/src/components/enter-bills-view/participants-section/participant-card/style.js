const card = {
  display: 'inline-block',
  position: 'relative'
};

export default {
  firstCard: card,
  card: Object.assign(
    { marginLeft: 15 },
    card
  ),
  deleteButton: {
    position: 'absolute',
    height: 'auto',
    lineHeight: 1,
    padding: '3px 5px 5px',
    top: -6,
    right: -6
  }
};