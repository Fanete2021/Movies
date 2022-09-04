import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import cl from './actor.module.scss';

const ActorForm = function ({ create }) {
    const [actor, setActor] = useState({ name: '', surname: '' });
    const [btnClass, setBtnClass]  = useState(cl.btn);

    async function addNewActor(e){
        e.preventDefault();
        create(actor)
    }

    useEffect(() => {
        var isEmpty = false;

        for (let key in actor) {
            if (actor[key].length === 0)
            {
                isEmpty = true;
                break;
            }
        }

        if (!isEmpty) 
            setBtnClass(cl.btnActive)
        else 
            setBtnClass(cl.btn)
    }, [actor])

    return (
        <div className={cl.form}>
            <Input
                value={actor.name}
                onChange={e => setActor({ ...actor, name: e.target.value })}
                type="text"
                placeholder="Name"
            />
            <Input
                value={actor.surname}
                onChange={e => setActor({ ...actor, surname: e.target.value})}
                type="text"
                placeholder="Surname"
            />

            <div className={btnClass}>
                <Button onClick={addNewActor}>Add</Button>
            </div>
        </div>
    );
};

export default ActorForm;