import React from 'react';

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

  return (
    <div className={`modal${isActive ? ' is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" aria-label="close" onClick={closeModal}></button>
        </header>
        <section className="modal-card-body">
          {children}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success">Save changes</button>
          <button className="button">Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default ModalSkeleton;