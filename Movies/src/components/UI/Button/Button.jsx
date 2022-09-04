import React from 'react';
import cl from './button.module.scss';

const Button = function ({ children, ...props }) {
    return (
        <button {...props} className={cl.btn}>
            {children}
        </button>
    );
};

export default Button;