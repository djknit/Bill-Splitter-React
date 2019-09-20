import React from 'react';
import { TextInput, RadioInputs } from '../../../../../../form-pieces';

function BillersMultipleInputs({
  inputValue,
  updateBillersMultiple,
  agents,
  formId
}) {

  return (
    <>
      {/* {
        inputValue.map((billerMultInput, index) => (
          <fieldset key={billerMultInput.inputId}>
            <legend>
              Biller {index + 1}
            </legend>
            {console.log(billerMultInput)}
          </fieldset>
        ))
      } */}
    </>
  );
}

export default BillersMultipleInputs;