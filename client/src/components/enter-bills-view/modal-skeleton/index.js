import React from 'react';
import getStyle from './style';

function ModalSkeleton({
  title,
  isActive,
  closeModal,
  children,
  hasSuccess,
  hasDanger,
  cancel,
  footerContent
}) {

  const style = getStyle({
    hasSuccess,
    hasDanger
  });

  return (
    <div className={`modal${isActive ? ' is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head" style={style.header}>
          <p className="modal-card-title" style={style.title}>
            {title}
          </p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body">
          {children}
        </section>
        <footer className="modal-card-foot" style={style.footer}>
          <button className="button" onClick={cancel}>
            {hasSuccess ?
              'Done' :
              'Cancel'
            }
          </button>
          {footerContent}
        </footer>
      </div>
    </div>
  );
}

export default ModalSkeleton;