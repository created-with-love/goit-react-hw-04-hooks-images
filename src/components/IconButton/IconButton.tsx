import React from 'react';
import './IconButton.scss';

interface Props {
  className?: string;
  children: React.ReactChild;
  onClick(): void;
  allyProps?: any[];
}

const IconButton = ({ className, children, onClick, ...allyProps }: Props) => (
  <button
    type="button"
    className={className ? className : 'IconButton'}
    onClick={onClick}
    {...allyProps}
  >
    {children}
  </button>
);

IconButton.defaultProps = {
  onClick: () => null,
  children: null,
};

export default IconButton;
