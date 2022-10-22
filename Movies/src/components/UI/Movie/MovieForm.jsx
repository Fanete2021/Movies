﻿import React, { useContext, useState } from 'react';
import { Context } from '../../../context';
import Button from '../Button/Button';
import Input from '../Input/Input';
import GenresSelector from '../Selector/GenresSelector';    
import ActorSelector from '../Selector/ActorSelector';
import { useEffect } from 'react';
import cl from './movie.module.scss';
import useInput from '../../../hooks/useInput';

const MovieForm = function ({ ...parameters }) {
    const typeParameters = typeof(parameters.changeableMovie) !== 'undefined';
    const { genres } = useContext(Context);
    const [disabled, setDisabled]  = useState(true);
    const count = useInput('1', {range: {min: 1, max: 100}});
    const title = useInput(typeParameters
                            ? parameters.changeableMovie.title
                            : '' 
                            ,{length: {min: 5, max: 32}});
    const description = useInput(typeParameters
                            ? parameters.changeableMovie.description
                            : '' 
                            ,{length: {min: 16, max: 512}});
    const premiereYear = useInput(typeParameters
                            ? parameters.changeableMovie.premiereYear
                            : '2022'
                            ,{range: {min: 1895, max: 2030}});
    const [selectedGenres, setSelectedGenres] = useState(typeParameters 
                                                        ? parameters.changeableMovie.genres : []);
    const [selectedActors, setSelectedActors] = useState(typeParameters 
                                                        ? parameters.changeableMovie.actors : []);

    async function addNewMovie(e) {
        e.preventDefault();
        
        let movie = {
            title: title.value,
            description: description.value,
            premiereYear: parseInt(premiereYear.value),
            genres: selectedGenres,
            actors: selectedActors
        };

        parameters.create(movie, parseInt(count.value));
    }

    async function changeMovie(e) {
        e.preventDefault();

        let movie = {
            title: title.value,
            description: description.value,
            premiereYear: parseInt(premiereYear.value),
            genres: selectedGenres,
            actors: selectedActors,
            id: parameters.changeableMovie.id
        };

        parameters.change(movie);
    }

    useEffect(() => {
        setDisabled(false);

        if (selectedGenres.length === 0 || selectedActors.length === 0)
        {
            setDisabled(true);
        }

        if (title.error || description.error || premiereYear.error || count.error)
        {
            setDisabled(true);
        }
    }, [title.error, description.error, premiereYear.error, selectedGenres, selectedActors])

    const setGenres = (e, genre) => {
        if (e.target.checked) {
            setSelectedGenres([...selectedGenres, genre]);
        }
        else {
            setSelectedGenres(selectedGenres.filter(g => g.id !== genre.id));
        }
    }

    const addActor = (actor) => {
        setSelectedActors([...selectedActors, actor]);
    }

    const deleteActor = (actor) => {
        setSelectedActors(selectedActors.filter(a => a.id !== actor.id));
    }

    return (
        <div className={cl.form}>
            {(title.isDirty && title.error) && <div className={cl.error}>{title.error}</div>}
            <Input
                value={title.value}
                onChange={e => title.onChange(e)}
                onBlur={e => title.onBlur(e)}
                type="text"
                placeholder="Title"
            />

            {(description.isDirty && description.error) && <div className={cl.error}>{description.error}</div>}
            <Input
                value={description.value}
                onChange={e => description.onChange(e)}
                onBlur={e => description.onBlur(e)}
                type="text"
                placeholder="Description"
            />

            {(premiereYear.isDirty && premiereYear.error) && <div className={cl.error}>{premiereYear.error}</div>}
            <Input
                value={premiereYear.value}
                onChange={e => premiereYear.onChange(e)}
                onBlur={e => premiereYear.onBlur(e)}
                type="number"
                placeholder="Premiere Year"
            />

            {parameters.type === "create" &&
                <div>
                     {(count.isDirty && count.error) && <div className={cl.error}>{count.error}</div>}
                    <Input
                        value={count.value}
                        onChange={e => count.onChange(e)}
                        onBlur={e => count.onBlur(e)}
                        type="number"
                        placeholder="Number of copies"
                    />
                </div>
            }

            <GenresSelector genres={genres} setGenres={setGenres} initialVisibility={true} selectedGenres={selectedGenres}/>

            <ActorSelector addActor={addActor} deleteActor={deleteActor} selectedActors={selectedActors} />

            {parameters.type === "create" 
                ?
                <Button disabled={disabled} onClick={addNewMovie}>Add</Button>
                :
                <Button disabled={disabled} onClick={changeMovie}>Change</Button>
            }
        </div>
    );
};

export default MovieForm;