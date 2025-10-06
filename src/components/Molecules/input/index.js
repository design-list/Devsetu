import React from 'react';
import Aux from '../../Atom/children';
import FormMargin from '../../Atom/formMargin';
import Label from '../../Atom/label/label';
import Input from '../../Atom/input';
import Error from '../../Atom/error';

const TextInput = (props) => {
    console.info("TextInputvalue", props.value);
    const ChageHandler = (e) => {
        //console.log(e.target.value, 'ChageHandler')
        props.onChange(props.name, e.target.value)
    }
    const BlurHandler = (value) => {
        props.onBlur(props.name, props.value)
    }

    return (
        <Aux>
            <FormMargin margin={props.margin}>
                <Label class={props.lblClass} label={props.label}></Label>
                <Input
                    type={props.type}
                    name={props.name}
                    placeholder={props.placeholder}
                    inputClass={props.inputClass}
                    onChange={ChageHandler}
                    onBlur={BlurHandler}
                    maxLength={props.maxLength}
                    value={props.value}
                    inputAnimation={props.inputAnimation}
                    searchIcon={props.searchIcon}
                    disabled={props.disabled}
                />
                {props.children}
                <Error errorMessage={props.errorMSg} />
            </FormMargin>

        </Aux>
    )
}

export default TextInput
