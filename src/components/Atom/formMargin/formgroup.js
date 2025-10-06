import React from 'react';

const FormGroup = (props) => {
    return (
        <div className="form-group" style={{ position: "relative" }}>
            {props.children}
        </div>
    )
}
export default FormGroup