import React from 'react';
import Aux from '../children';
import './input.css';

const Input = (props) => {
    return (
        <Aux>
            <div className="formRe">
                <input
                    autoComplete="off"
                    id={props.id}
                    type={props.type !== undefined ? props.type : "text"}
                    name={props.name}
                    className={`txtbox ${props.inputClass}`}
                    placeholder={props.placeholder}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    value={props.value}
                    maxLength={props.maxLength}
                    disabled={props.disabled || false}
                    defaultChecked={props.checked}
                />
                {props.inputAnimation === false ? null :
                    <span className="focus-border"></span>}                
                <i class="fas fa-pencil-alt pencil-iconsec" aria-hidden="true"></i>
                {props.searchIcon ?
                    <span className="search_icon"></span> : null}
                {props.otpBtn ? <span className="getOTP">Get OTP</span> : null}
                {props.info ? <span className="forinfo">{props.infomsg}</span> : null}
            </div>
        </Aux>
    )
}












export default Input