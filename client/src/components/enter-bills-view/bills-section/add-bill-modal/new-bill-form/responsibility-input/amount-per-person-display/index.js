import React from 'react';
import getStyle from './style';

function AllEvenlyDisplay({
  amountDisplayValue,
  numberOfParticipants,
  sizeRatio
}) {

  const style = getStyle(sizeRatio);

  if (numberOfParticipants === 0) {
    return <></>
  }
  else if (amountDisplayValue === null) {
    return (
      <div style={style.divNoValue}>
        Enter the Bill Total above to see the cost per person.
      </div>
    );
  }
  else if (amountDisplayValue === 'negative') {
    return (
      <div style={style.divNoValue}>
        Correct the Bill Total above to see the cost per person.
      </div>
    );
  }
  else {
    return (
      <div style={style.divWithValue}>
        <span style={style.value}>$ {amountDisplayValue}</span> per
        person for each of the {numberOfParticipants} participants
      </div>
    );
  }
}

export default AllEvenlyDisplay;