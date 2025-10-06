import React, { Fragment } from 'react';
import Select from "react-select";
import './reactSelect.css';


export default function ReactSelect(props) {

    return (
        <Fragment>
            <Select
                name={props.name}
                id={props.name}
                options={props.options}
                //menuIsOpen={true}
                //  autoFocus={true}
                value={props.value === undefined ? "" : props.value}
                onBlur={props.onBlur}
                onChange={props.onChange}
                className={`txtSelect  ${props.class}`}
                isDisabled={props.disabled}
            />
        </Fragment>
    )
}
