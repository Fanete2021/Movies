import React, { useState } from 'react';
import { useEffect } from 'react';
import useInput from '../../../hooks/useInput';
import Button from '../Button/Button';
import Input from '../Input/Input';
import cl from './actor.module.scss';

const ActorForm = function ({ create }) {
    const [actor, setActor] = useState({ name: '', surname: ''});
    const [disabled, setDisabled] = useState(true);
    const name = useInput('', {length: {min: 2, max: 16}, regex: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u});
    const surname = useInput('', {length: {min: 2, max: 16}, regex: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u});

    async function addNewActor(e){
        e.preventDefault();
        create(actor)
    }

    useEffect(() => {
        setDisabled(false)

        for (let key in actor) {
            if (!actor[key])
            {
                setDisabled(true);
                break;
            }
        }

        if(name.error || surname.error)
            setDisabled(true);
    }, [actor])

    useEffect(() => {
        setActor({...actor, name: name.value, surname: surname.value});
    }, [name.value, surname.value])

    return (
        <div className={cl.form}>
            {(name.isDirty && name.error) && <div className={cl.error}>{name.error}</div>}
            <Input
                value={name.value}
                onChange={e => name.onChange(e)}
                onBlur={e => name.onBlur(e)}
                type="text"
                placeholder="Name"
            />

            {(surname.isDirty && surname.error) && <div className={cl.error}>{surname.error}</div>}
            <Input
                value={surname.value}
                onChange={e => surname.onChange(e)}
                onBlur={e => surname.onBlur(e)}
                type="text"
                placeholder="Surname"
            />

            <Button disabled={disabled} onClick={addNewActor}>Add</Button>
        </div>
    );
};

export default ActorForm;