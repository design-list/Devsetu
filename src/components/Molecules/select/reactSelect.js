import React from "react";
import Aux from '../../Atom/children';
import MarginForm from '../../Atom/formMargin';
import Label from '../../Atom/label/label';
import Select from '../../Atom/select/reactSelect';
import Error from '../../Atom/error';



const Reactselect = (props) => {

    if (props.name === "schemeList") {
        console.log("Reactselect--->", props.value);
    }

    // const onBlur = (e) => {
    //     const { name, value } = e.currentTarget
    //     console.info("e.currentTarget", e.currentTarget);
    //     props.onBlur(props.name, props.value)
    // }

    const onBlur = (name, value) => {
        props.onBlur(name, value)
    }

    const onChange = (data) => {
        console.log("props data", data, "PropsNAme", props.name)
        if (props.name == "bankDetails") {
            props.onChange(data.label, data.value)
        }
        else if (props.name == "ArnCode") {
            props.onChange(data.label, data.value)
        }
        else if (props.name == "brokerName") {
            props.onChange(data.label, data.value)
        }
        else {
            props.onChange(props.name, data.value)
        }

    }

    return (
        <Aux>
            <MarginForm margin={props.margin}>
                {props.label !== undefined ?
                    <Label label={props.label} class={props.lblClass} /> : null}
                <div className="formRe">
                    <Select
                        name={props.name}
                        id={props.name}
                        options={props.options}
                        // value={props.options.filter(function(curr){                            
                        //     return props.value === curr.value? curr.value: ""
                        // })}
                        value={props.value}
                        onBlur={() => onBlur(props.name, props.value)}
                        onChange={onChange}
                        class={props.class}
                        disabled={props.disabled}
                    />
                    <Error errorMessage={props.errorMsg} />


                </div>
            </MarginForm>
        </Aux>
    );
};

export default Reactselect
