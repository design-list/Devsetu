import React from 'react';
import './index.css';

const MarginForm = (props) => {
    return (
        <div className={`formMargin clearfix ${props.margin}`}>
            {props.children}
        </div>
    );
};

export default MarginForm