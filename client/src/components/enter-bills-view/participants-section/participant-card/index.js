import React from 'react';
import style from './style';

function ParticipantCard({
  participant,
  isFirst
}) {

  return (
    <div
      className="card"
      style={isFirst ? style.firstCard : style.card}
    >
      <button
        className="button is-danger"
        style={style.deleteButton}
        // onClick={}
      >
        &times;
      </button>
      <div className="card-content">
        {participant.name}
      </div>
    </div>
  );
}

export default ParticipantCard;