import React from 'react';
import getStyle from './style';

function AllEvenlyDisplay({
  amountDisplayValue,
  numberOfParticipants,
  sizeRatio
}) {

  const style = getStyle(sizeRatio);
  console.log(sizeRatio)

  if (amountDisplayValue === null) {
    return (
      <div style={style.divNoValue}>
        Enter the Bill Total above to see the cost per person.
      </div>
    );
  }
  else if (amountDisplayValue === 'negative') {
    return (
      <div style={style.divNoValue}>
        Correct the Bill Total above to see the cost per person. Negative values are not allowed.
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