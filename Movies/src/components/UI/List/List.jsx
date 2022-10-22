import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import cl from './list.module.scss';

const List = function ( {title, entities, countEntities, isEntitiesLoading, getItem }) {
    return (
        <div className={cl.list}>
                {!isEntitiesLoading &&
                    <h1>
                        {title} ({countEntities})
                    </h1>
                }
                <TransitionGroup>
                    {entities.map(entity =>
                        <CSSTransition key={entity.id} timeout={500} classNames="item">
                            {getItem(entity, entity.id)}
                        </CSSTransition> 
                    )}
                </TransitionGroup>
        </div>
    );
};

export default List;