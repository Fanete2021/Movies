import React from 'react';
import { useState } from 'react';
import cl from './genresSelector.module.scss';

const GenresSelector = function ({ genres, setGenres, selectedGenres, initialVisibility = false }) {
    const [visible, setVisible] = useState(initialVisibility);
    const titleClasses = [cl.selector__title]

    if (visible) {
        titleClasses.push(cl.active);
    }

    return (
        <div className={cl.selector}>
            <div onClick={() => setVisible(!visible)} className={titleClasses.join(' ')}>
                <strong>Genres</strong>
            </div>

            {visible &&
                <div className={cl.selector__genres}>
                    {genres.map((genre, index) =>
                        {                    
                            let checked = selectedGenres.findIndex(g => g.id === genre.id) >= 0;
                            return (
                                <div key={genre.id} className={cl.genres__wrap}>
                                    <input
                                        className={cl.genres__inp}
                                        type="checkbox"
                                        checked = {checked}
                                        onChange={(e) => setGenres(e, genre)}
                                        id={Date.now().toString() + index}
                                    />
                                    <label className={cl.genres__label} htmlFor={Date.now().toString() + index}>
                                        {genre.title}
                                    </label>
                                </div>
                            )
                        }
                    )}
                </div> 
            }  
        </div>
    );
};

export default GenresSelector;