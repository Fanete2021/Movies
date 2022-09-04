import React from 'react';
import cl from './creator.module.scss';

const Creator = ({ children, setVisible }) => {
    return (
        <div className={cl.creator} onClick={() => setVisible(false)}>
            <div className={cl.creator__content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Creator;