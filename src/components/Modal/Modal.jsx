import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as CloseIcon } from '../../icons/close.svg';

const modalRoot = document.querySelector('#modal-root');

// переиспользуемая модалка, как children любой контент передаем
export default function Modal({ onClose, children }) {
  useEffect(() => {
    // закрытие по клику эскпейпа
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return function clearup() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, children]);

  //   закрытие по клику в бэкдроп
  function handelBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  // "портал" для модалки (убирает костыль с z-index и оверфлоу)
  return createPortal(
    <div className="Modal__backdrop" onClick={handelBackdropClick}>
      <div className="Modal__content">
        <IconButton
          className="Modal__close IconButton"
          aria-label="Close Modal icon"
          onClick={onClose}
        >
          <CloseIcon width="32" height="32" fill="#black" />
        </IconButton>
        {children}
      </div>
    </div>,
    modalRoot,
  );
}
