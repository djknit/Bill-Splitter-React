import React from 'react';
import style from './style';

function Section({
  isButtonDisabled,
  type,
  children,
  openModal
}) {

  isButtonDisabled = isButtonDisabled === true;

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
          style={style.addButton}
          disabled={isButtonDisabled}
          onClick={isButtonDisabled ? undefined : openModal}
        >
          Add {type}
        </div>
      </footer>
    </div>
  );
}

export default Section;