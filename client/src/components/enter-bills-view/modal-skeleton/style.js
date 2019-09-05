export default function({ hasSuccess, hasDanger }) {
  const footer = {
    display: 'block',
    textAlign: 'right'
  };

  return (hasSuccess || hasDanger) ?
    {
      header: {
        backgroundColor: (hasSuccess && '#23d160') ||
          (hasDanger && '#ff3860')
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