import React, { useContext } from 'react';
import { Context } from '../../../context';
import GenresSelector from '../Selector/GenresSelector';
import Input from '../Input/Input';
import ActorSelector from '../Selector/ActorSelector';
import cl from './movieFilter.module.scss';

const MovieFilter = function ({ filter, setFilter }) {
    const { genres } = useContext(Context)

    const changeGenres = (e, genre) => {
        if (e.target.checked) {
            setFilter({ ...filter, genres: [...filter.genres, genre] })
        }
        else {
            setFilter({ ...filter, genres: filter.genres.filter(g => g.id !== genre.id) })
        }
    }

    const addActor = async (actor, setVisible) => {
        setVisible(false)
        setFilter({ ...filter, actors: [...filter.actors, actor] })
    }

    const deleteActor = async (actor) => {
        setFilter({ ...filter, actors: filter.actors.filter(a => a.id !== actor.id) })
    }

    return (
        <div className={cl.search}>
            <div className={cl.parameters}>
                <div className={cl.title}>
                    <strong>Filter</strong>
                </div>

                <Input
                    value={filter.title}
                    onChange={e => setFilter({ ...filter, title: e.target.value })}
                    placeholder="Title"
                />

                <GenresSelector genres={genres} changeArray={changeGenres} />
        
                <div className={cl.parameters__selector}>
                    <ActorSelector addActor={addActor} deleteActor={deleteActor} selectedActors={filter.actors} />
                </div>
            </div>
        </div>
    );
};

export default MovieFilter;