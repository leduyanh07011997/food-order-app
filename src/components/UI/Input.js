import React from 'react';
import './Input.scss';

const Input = React.forwardRef((props,ref) => {
    return (
        <div className="input">
            <label htmlFor={props.input.id}>{props.label}</label>
            <input ref={ref} id={props.input.id} {...props.input}></input>
        </div>
    );
});

export default Input;