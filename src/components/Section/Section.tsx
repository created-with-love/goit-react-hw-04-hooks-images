import React from 'react';
import './Section.css';

interface Props {
  children: React.ReactChild | React.ReactElement | Element;
}

export default function Section({ children }: Props) {
  return <div className="Section">{children}</div>;
}
