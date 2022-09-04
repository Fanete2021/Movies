import React from 'react';
import { useState } from 'react';
import cl from './genresSelector.module.scss';

const   GenresSelector = function ({ genres, changeArray }) {
    const [visible, setVisible] = useState(true);
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
                        <div key={genre.id} className={cl.genres__wrap}>
                            <input
                                className={cl.genres__inp}
                                type='checkbox'
                                onChange={(e) => changeArray(e, genre)}
                                id={Date.now().toString() + index}
                            />
                            <label className={cl.genres__label} htmlFor={Date.now().toString() + index}>
                                {genre.title}
                            </label>
                        </div>
                        )}
                </div> 
            }  
        </div>
    );
};

export default GenresSelector;