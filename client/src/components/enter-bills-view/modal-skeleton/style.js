export default function({ theme }) {
  const footer = {
    display: 'block',
    textAlign: 'right'
  };

  return theme ?
    {
      header: {
        backgroundColor: (theme === 'success' && '#23d160') ||
          (theme === 'danger' && '#ff3860')
      },
      title: {
        color: 'white'
      },
      footer
    } :
    {
      footer
    };
};

const notificationTitle = {
  marginBottom: 10
};

export { notificationTitle };