import React from 'react';
import './Button.css';

interface IButton {
  onClick(): void;
}

export default function Button({ onClick }: IButton) {
  return (
    <button type="button" className="Button" onClick={onClick}>
      Load more
    </button>
  );
}
