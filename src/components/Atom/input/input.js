import React from 'react'

export default function input(props) {
    return (
        <>
            <input
                autoComplete="off"
                id={props.id}
                type={props.type !== undefined ? props.type : "text"}
                name={props.name}
                className={props.inputClass}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onBlur={props.onBlur}
                value={props.value}
                maxLength={props.maxLength}
                disabled={props.disabled || false}
                defaultChecked={props.checked}
            />
        </>
    )
}
