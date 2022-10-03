import React, { useContext, useState } from 'react';
import { Context } from '../../../context';
import Button from '../Button/Button';
import Input from '../Input/Input';
import GenresSelector from '../Selector/GenresSelector';    
import ActorSelector from '../Selector/ActorSelector';
import { useEffect } from 'react';
import cl from './movie.module.scss';
import useInput from '../../../hooks/useInput';

const MovieForm = function ({ create }) {
    const { genres } = useContext(Context);
    const [disabled, setDisabled]  = useState(true);
    const title = useInput('', {length: {min: 5, max: 32}});
    const description = useInput('', {length: {min: 16, max: 512}});
    const premiereYear = useInput('2022', {range: {min: 1895, max: 2030}});
    const [movie, setMovie] = useState({ title: "", description: "", 
                                         premiereYear: "", genres: [], actors: [] });

    async function addNewMovie(e){
        e.preventDefault();
        create(movie);
    }

    useEffect(() => {
        setDisabled(false);

        for (let key in movie) {
            if (movie[key].length === 0)
            {
                setDisabled(true);
                break;
            }
        }

        if (title.error || description.error || premiereYear.error)
            setDisabled(true);
    }, [movie])

    useEffect(() => {
        setMovie({...movie, title: title.value, description: description.value, premiereYear: parseInt(premiereYear.value)});
    }, [title.value, description.value, premiereYear.value])

    const changeGenres = (e, genre) => {
        if (e.target.checked) {
            setMovie({ ...movie, genres: [...movie.genres, genre]});
        }
        else {
            setMovie({ ...movie, genres: movie.genres.filter(g => g.id !== genre.id)});
        }
    }

    const addActor = (actor) => {
        setMovie({ ...movie, actors: [...movie.actors, actor]});
    }

    const deleteActor = (actor) => {
        setMovie({ ...movie, actors: movie.actors.filter(a => a.id !== actor.id)});
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

            <GenresSelector genres={genres} changeArray={changeGenres}/>

            <ActorSelector addActor={addActor} deleteActor={deleteActor} selectedActors={movie.actors} />

            <Button disabled={disabled} onClick={addNewMovie}>Add</Button>
        </div>
    );
};

export default MovieForm;