import React, { Component } from 'react';
import style from './style';
import ModalSkeleton from '../modal-skeleton';

class Section extends Component {
  constructor() {
    super();
    this.state = {
      isModalActive: false
    };
  }

  toggleModal(open) {
    this.setState({
      isModalActive: open
    });
  }

  render() {
    const {
      isButtonDisabled,
      type,
      children
    } = this.props;
    const { isModalActive } = this.state;

    return (
      <div className="card" style={style.card}>
        <header className="card-header">
          <p className="card-header-title">
            {type}s
          </p>
        </header>
        <div className="card-content" style={style.cardContent}>
          {children}
        </div>
        <footer className="card-footer" style={style.cardFooter}>
          <div
            className="button is-info"
            style={style.addParticipant}
            disabled={isButtonDisabled === true}
            onClick={() => this.toggleModal('open')}
          >
            Add {type}
          </div>
        </footer>
        <ModalSkeleton
          isActive={isModalActive}
          closeModal={() => this.toggleModal(false)}
        />
      </div>
    );
  }
}

export default Section;