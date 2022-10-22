﻿import React, { useContext } from 'react';
import { Context } from '../../../context';
import GenresSelector from '../Selector/GenresSelector';
import Input from '../Input/Input';
import ActorSelector from '../Selector/ActorSelector';
import cl from './movieFilter.module.scss';
import RangeSlider from '../RangeSlider/RangeSlider';

const MovieFilter = function ({ filter, setFilter }) {
    const { genres } = useContext(Context);
    const minPremiereYear = 1895, maxPremiereYear = 2030;

    const setGenres = (e, genre) => {
        if (e.target.checked) {
            setFilter({ ...filter, genres: [...filter.genres, genre] })
        }
        else {
            setFilter({ ...filter, genres: filter.genres.filter(g => g.id !== genre.id) })
        }
    }

    const addActor = async (actor) => {
        setFilter({ ...filter, actors: [...filter.actors, actor] })
    }

    const deleteActor = async (actor) => {
        setFilter({ ...filter, actors: filter.actors.filter(a => a.id !== actor.id) })
    }

    const changeMinPremiereYear = (year) => {
        setFilter({ ...filter, minPremiereYear: year} );
    }

    const changeMaxPremiereYear = (year) => {
        setFilter({ ...filter, maxPremiereYear: year} );
    }

    return (
        <div className={cl.search}>
            <div className={cl.title}>
                <strong>Filter</strong>
            </div>

            <div className={cl.parameters}>

                <Input
                    value={filter.title}
                    onChange={e => setFilter({ ...filter, title: e.target.value })}
                    placeholder="Title"
                />

                <RangeSlider min={minPremiereYear} max={maxPremiereYear} 
                             setMin={changeMinPremiereYear} setMax={changeMaxPremiereYear}>
                </RangeSlider>

                <GenresSelector genres={genres} setGenres={setGenres} selectedGenres={filter.genres} />
        
                <div className={cl.parameters__selector}>
                    <ActorSelector addActor={addActor} deleteActor={deleteActor} selectedActors={filter.actors} />
                </div>
            </div>
        </div>
    );
};

export default MovieFilter;