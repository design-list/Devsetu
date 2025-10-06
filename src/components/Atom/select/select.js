import React from 'react';
import './reactSelect.css';
const Select = (props) => {
    return (
        <select
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            disabled={props.disabled !== undefined ? props.disabled : false}
            placeholder={props.placeholder}
            name={props.name}
            className={`txtbox ${props.selectClass}`}>
            {
                props.option.map((option, id) => {
                    return <option key={id} value={option.value} data-one={option.value} data-two={option.label}>{option.label}</option>
                })
            }
        </select>
    )

}
export default Select