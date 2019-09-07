import React from 'react';
import style from './style';

function ParticipantCard({
  participant,
  isFirst,
  openRemoveParticipantModal
}) {

  return (
    <div
      className="card"
      style={isFirst ? style.firstCard : style.card}
    >
      <button
        className="button is-danger"
        style={style.deleteButton}
        onClick={openRemoveParticipantModal}
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