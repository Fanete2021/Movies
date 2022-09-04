import React from 'react';
import ActorItem from './ActorItem';
import cl from './actor.module.scss';

const ActorList = function ( {actors, countActors, remove, isActorsLoading }) {

    if (!actors.length) {
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
            {!isActorsLoading &&
                <h1>
                    List of actors ({countActors})
                </h1>
            }
            {actors.map(actor => 
                <ActorItem remove={remove} actor={actor} key={actor.id} />
            )}
        </div>
    );
};

export default ActorList;