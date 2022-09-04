import React from 'react';
import cl from './actorsSearches.module.scss';

const ActorsSearches = function ({ actors, changeActors, visible, setVisible, query }) {
    const rootClasses = [cl.searches]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')}>
            {actors.map(actor =>
                <div key={actor.id} className={cl.searches__item} onClick={() => changeActors(actor, setVisible, query)}>
                    {actor.name} {actor.surname}
                </div>
            )}
        </div >
    );
};
export default ActorsSearches;