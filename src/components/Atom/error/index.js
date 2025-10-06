import React from "react";
import './error.css';

export default function Error(props) {
  return <div className={props.class ? `error-message ${props.class}` : 'error-message'} style={{ ...props.style }}>{props.errorMessage}</div>;
}
