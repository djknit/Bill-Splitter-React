import React from 'react';

function AllEvenlyDisplay({
  amountDisplayValue
}) {

  if (amountDisplayValue === null) {
    return (
      <div>
        Enter the Bill Total above to see the cost per person.
      </div>
    );
  }
  else if (amountDisplayValue === 'negative') {
    return (
      <div>
        Correct the Bill Total above to see the cost per person. Negative values are not allowed.
      </div>
    );
  }
  else {
    return (
      <div>
        <span>
          $ {amountDisplayValue}
        </span>
      </div>
    );
  }
}