import React from "react";

export default function TextField(props) {
  return (
    <input
      autoComplete="none"
      id={props.id}
      type={props.type || 'text'}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      className={'text-field'}
      disabled={props.disabled || false}
      maxLength={props.maxlength}
      defaultChecked={props.checked}
    />
  );
}
