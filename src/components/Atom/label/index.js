import React from 'react';
import './index.css';
export default function Label(props) {
    return (
        <label htmlFor={props.for} className={`lbl ${props.class}`}
            dangerouslySetInnerHTML={{
                __html: props.label,
            }}
        ></label>
    )
}
