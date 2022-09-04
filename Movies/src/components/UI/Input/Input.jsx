import React from 'react';
import cl from './input.module.scss';

const Input = function (props) {
    return (
        <div className={cl.wrap}>
            <input className={cl.inp} {...props} required/>
            <label className={cl.description}>{props.placeholder}</label>
        </div>
    );
};

export default Input;