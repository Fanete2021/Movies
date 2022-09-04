import React, { useContext, useState } from 'react';
import { Context } from '../../../context';
import Button from '../Button/Button';
import Input from '../Input/Input';
import GenresSelector from '../Selector/GenresSelector';    
import ActorSelector from '../Selector/ActorSelector';
import { useEffect } from 'react';
import cl from './movie.module.scss';

const MovieForm = function ({ create }) {
    const [movie, setMovie] = useState({ title: '', description: '', premiereYear: '', genres: [], actors: [] });
    const { genres } = useContext(Context);
    const [btnClass, setBtnClass]  = useState(cl.btn);
    const [count, setCount] = useState(1);

    async function addNewMovie(e){
        e.preventDefault();
        create(movie, count);
    }

    useEffect(() => {
        var isEmpty = false;

        for (let key in movie) {
            if (movie[key].length === 0)
            {
                isEmpty = true;
                break;
            }
        }

        if (!isEmpty) 
            setBtnClass(cl.btnActive)
        else 
            setBtnClass(cl.btn)
    }, [movie])

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
            <Input
                value={movie.title}
                onChange={e => setMovie({ ...movie, title: e.target.value })}
                type="text"
                placeholder="Title"
            />
            <Input
                value={movie.description}
                onChange={e => setMovie({ ...movie, description: e.target.value})}
                type="text"
                placeholder="Description"
            />
            <Input
                value={movie.premiereYear}
                onChange={e => setMovie({ ...movie, premiereYear: e.target.value })}
                type="number"
                placeholder="Premiere Year"
            />
            <Input
                value={count}
                onChange={e => setCount(e.target.value)}
                type="number"
                placeholder="Count"
            />

            <GenresSelector genres={genres} changeArray={changeGenres}/>

            <div>
                <ActorSelector addActor={addActor} deleteActor={deleteActor} selectedActors={movie.actors} />
            </div>

            <div className={btnClass}>
                <Button onClick={addNewMovie}>Add</Button>
            </div>
        </div>
    );
};

export default MovieForm;