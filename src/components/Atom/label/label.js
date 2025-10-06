import React from 'react';
import './index.css'
const Label = (props) => {

    let label = props.label
    return <label htmlFor={props.for} className={`lbl ${props.class}`}
        dangerouslySetInnerHTML={{
            __html: label,
        }}
    ></label>
};

export default Label