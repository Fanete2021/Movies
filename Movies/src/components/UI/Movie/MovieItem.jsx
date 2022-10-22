import React from 'react';
import Button from '../Button/Button';
import cl from './movie.module.scss';

const MovieItem = function (props) {
    const changeMovie = () => {
        props.setChangeableMovie(props.movie);
        props.changeStateForm("change");
    } 

    return (
        <div className={cl.movie}>
            <div>
                <span className={cl.movie__title}>{props.movie.title}</span>

                <span className={cl.movie__premiere}> (premiere: {props.movie.premiereYear})</span>

                <div className={cl.movie__genres}>
                    {props.movie.genres.map(genre => `•${genre.title} `)}
                </div>

                <div className={cl.movie__description}>{props.movie.description}</div>

                <div className={cl.movie__cast}>
                    <strong>Cast: </strong>{props.movie.actors.map(actor => actor.name + ' ' + actor.surname).join(', ')}
                </div>
            </div>

            <div className={cl.btns}>
                <div className={cl.btns__edit}>
                    <Button disabled={!props.isAuth} onClick={changeMovie}>
                        Edit
                    </Button>
                </div>
                <div className={cl.btns__delete}>
                    <Button disabled={!props.isAuth} onClick={() => props.remove(props.movie)}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;