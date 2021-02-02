import React, { MouseEvent, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.scss';
import IconButton from '../IconButton/IconButton';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const modalRoot = document.querySelector('#modal-root');

interface Props {
  onClose(): void;
  children?: React.ReactChild;
}

// переиспользуемая модалка, как children любой контент передаем
export default function Modal({ onClose, children }: Props) {
  useEffect(() => {
    // закрытие по клику эскпейпа
    function handleKeyDown(e: KeyboardEvent) {
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
  function handelBackdropClick(e: MouseEvent): void {
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
          <AiOutlineCloseCircle size="2.9em" fill="#black" />
        </IconButton>
        {children}
      </div>
    </div>,
    modalRoot as Element,
  );
}
