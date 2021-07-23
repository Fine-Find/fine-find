import React, { HTMLAttributes, ReactNode } from 'react'
import './Button.css';


export interface Props extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    label?: string;
    onClick?: () => void;
}

export const Button = (props: Props) => {
  return (
    <button 
      {...props} 
      style={{
        backgroundColor: '#DCDCDC',
        fontFamily: 'Montserrat', 
        borderColor: "#650066",
        border: '1px solid',
        color: '#650066',
        cursor: 'pointer',
        borderRadius: 100,
        padding: '1px 5px 4px',
        paddingBottom: '2px'
      }}
    >
      {props.label}
    </button>
  )
}

