// Checks that required props are not undefined
export default function requireProps(props) {

  if (typeof(props) !== 'object') throw new Error('bad input for require props function. expected object');

  const propNames = Object.keys(props);

  let missingProps = '';

  propNames.forEach(propName => {
    if (props[propName] === undefined) {
      if (missingProps !== '') missingProps += ', ';
      missingProps += propName;
    }
  });

  if (missingProps !== '') throw new Error(`Missing required props: ${missingProps}`);
}