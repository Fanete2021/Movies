import React from 'react';
import MovieItem from './MovieItem';
import cl from './movie.module.scss';

const MovieList = function ({ movies, countMovies, remove, isMovieLoading }) {

    if (!movies.length && !isMovieLoading) {
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
            {!isMovieLoading &&
                <h1>
                    List of movies ({countMovies})
                </h1>
            }
            {movies.map(movie => 
                <MovieItem remove={remove} movie={movie} key={movie.id} />
            )}
        </div>
    );
};

export default MovieList;