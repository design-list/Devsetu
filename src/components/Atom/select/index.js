import React from 'react';

export default function Select(props) {
    const { className, options, selected, onChange } = props;
    console.log(options,'SELECToptions')
    options.map((option, id) => {
        console.log(option,'SELECTopt')
        console.log(id)
    })
    return (
        <>
            <select className={className} onChange={onChange}>
                {
                    options.map((option, id) => {
                        return <option key={id} value={option}>{option}</option>
                    })
                }
            </select>
        </>
    );
}
