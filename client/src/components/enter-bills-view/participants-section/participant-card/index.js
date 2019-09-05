import React, { Component } from 'react';
import { participantsService } from '../../data/entities';
import style from './style';

class ParticipantCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { participant } = this.props;
    return (
      <div className="card" style={style.card}>
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
}

export default ParticipantCard;