export default function({ theme, padding }) {
  const footer = {
    display: 'block',
    textAlign: 'right'
  };

  return {
    header: theme ?
      {
        backgroundColor: (theme === 'success' && '#23d160') ||
          (theme === 'danger' && '#ff3860')
      } :
      {}
    ,
    title: theme ?
      { color: 'white' } :
      {}
    ,
    footer,
    cardBody: padding ?
      { padding } :
      {}
  };
};

const notificationTitle = {
  marginBottom: 10
};

export { notificationTitle };