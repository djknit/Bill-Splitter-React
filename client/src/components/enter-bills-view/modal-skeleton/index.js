import React from 'react';
import getStyle from './style';

function ModalSkeleton({
  title,
  theme,
  isActive,
  closeModal,
  children,
  hasSuccess,
  reset,
  cancelButtonRef,
  footerContent,
  cancelButtonSuccessText,
  padding
}) {

  const style = getStyle({ theme, padding });

  function cancel() {
    closeModal();
    reset();
  }

  return (
    <div className={`modal${isActive ? ' is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-card" style={style.card}>
        <header className="modal-card-head" style={style.header}>
          <p className="modal-card-title" style={style.title}>
            {title}
          </p>
          <button
            className="delete"
            aria-label="close"
            onClick={hasSuccess ? cancel : closeModal}>
          </button>
        </header>
        <section className="modal-card-body" style={style.cardBody}>
          {children}
        </section>
        <footer className="modal-card-foot" style={style.footer}>
          <button className="button" onClick={cancel} ref={cancelButtonRef}>
            {hasSuccess ?
              (cancelButtonSuccessText || 'Done') :
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