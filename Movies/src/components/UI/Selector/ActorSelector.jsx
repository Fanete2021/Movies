import React, { useEffect, useMemo, useState } from 'react';
import Service from '../../../API/Service';
import useDebounce from '../../../hooks/useDebounce';
import cl from './actorSelector.module.scss';

const ActorSelector = function ({ addActor, deleteActor, selectedActors }) {
    const [visible, setVisible] = useState(false);
    const [searchedActors, setSearchedActors] = useState([]);
    const [name, setName] = useState('');
    const debouncedSubstr = useDebounce(name, 400);
    const titleClasses = [cl.selector__title];
    const actorsClasses = [cl.actorsBlock];

    if (visible) {
        actorsClasses.push(cl.active);
    }

    if (selectedActors.length) {
        titleClasses.push(cl.active);
    }

    const updateSearchedActors = async (name) => {
        let params = {
            limit: 10,
            page: 1,
            bannedIds: selectedActors.map(a => a.id),
            name: name
        };
        let APIService = "actors";

        const response = await Service.getEntities(APIService, params);

        setSearchedActors(response.data);
    }

    const changeSubstr = async (e) => {
        setName(e.target.value);
    }

    useEffect(() => {
        updateSearchedActors(name);
    }, [debouncedSubstr])

    const filtredActors = useMemo(() => 
        searchedActors.filter(a => selectedActors.findIndex(actor => a.id === actor.id) < 0,
        [selectedActors])
        );

    const Add = async (actor) => {
        setVisible(false);
        addActor(actor);
        await updateSearchedActors(name);
    }

    const Delete = async (actor) => {
        deleteActor(actor);
        await updateSearchedActors(name);
    }
    
    return (
        <div className={cl.selector}>
            <div className={cl.selector__selectedActors}>
                <div className={titleClasses.join(' ')}>
                    <strong>Actors</strong>
                </div>

                {selectedActors.map((actor, index) => {
                    let fullName = actor.name + ' ' + actor.surname
                    if (index + 1 !== selectedActors.length)
                        fullName += ', '
                    return (
                        <span key={actor.id} className={cl.content__actor} onClick={() => Delete(actor)}>
                            {fullName}
                        </span>
                    )
                })}
            </div>

            <input
                className={cl.selector__inp}
                type="text"
                onFocus={() => setVisible(true)}
                onBlur={() => setVisible(true)}
                onChange={changeSubstr}
            />

            <div className={actorsClasses.join(' ')}>
                {filtredActors.map(actor =>
                    <div key={actor.id} className={cl.actorsBlock__item} onClick={() => Add(actor)}>
                        {actor.name} {actor.surname}
                    </div>
                )}
            </div >
        </div>
    );
};

export default ActorSelector;