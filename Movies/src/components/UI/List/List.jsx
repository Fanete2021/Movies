import React from 'react';
import cl from './list.module.scss';

const List = function ( {title, entities, countEntities, isEntitiesLoading, getItem }) {
    if (!entities.length) {
        return (
            <div className={cl.content}>
                <h1>
                    The list is empty
                </h1>
            </div>
        )
    }

    return (
        <div className={cl.content}>
            {!isEntitiesLoading &&
                <h1>
                    {title} ({countEntities})
                </h1>
            }
            {entities.map(actor => 
                getItem(actor, actor.id)
            )}
        </div>
    );
};

export default List;