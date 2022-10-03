import React from 'react';
import Button from '../Button/Button';
import cl from './movie.module.scss';

const MovieItem = function (props) {
    return (
        <div className={cl.movie}>
            <div>
                <span className={cl.movie__title}>{props.movie.title}</span>

                <span className={cl.movie__premiere}> (premiere: {props.movie.premiereYear})</span>

                <div className={cl.movie__genres}>
                    {props.movie.genres.map(genre => <span key={Math.random()}>•{genre.title}</span>)}
                </div>

                <div className={cl.movie__description}>{props.movie.description}</div>

                <div>
                    <strong>Cast: </strong>{props.movie.actors.map(actor => actor.name + ' ' + actor.surname).join(', ')}
                </div>
            </div>

            <div className={cl.btn}>
                <Button disabled={!props.isAuth} onClick={() => props.remove(props.movie)}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default MovieItem;