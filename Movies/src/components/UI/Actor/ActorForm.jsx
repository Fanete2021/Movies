import React, { useState } from 'react';
import { useEffect } from 'react';
import useInput from '../../../hooks/useInput';
import Button from '../Button/Button';
import Input from '../Input/Input';
import cl from './actor.module.scss';

const ActorForm = function ({ ...parameters }) {
    const typeParameters = typeof(parameters.changeableActor) !== 'undefined';
    const [disabled, setDisabled] = useState(true);
    const name = useInput(typeParameters
                        ? parameters.changeableActor.name
                        : ''
                        , {length: {min: 2, max: 16}, regex: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u});
    const surname = useInput(typeParameters
                        ? parameters.changeableActor.surname
                        : ''
                        , {length: {min: 2, max: 16}, regex: /^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u});

    async function addNewActor(e){
        e.preventDefault();

        let actor = {
            name : name.value,
            surname: surname.value
        }

        parameters.create(actor)
    }

    async function changeActor(e) {
        e.preventDefault();

        let actor = {
            name: name.value,
            surname: surname.value,
            id: parameters.changeableActor.id
        };

        parameters.change(actor);
    }

    useEffect(() => {
        setDisabled(false);

        if(name.error || surname.error || name.value.length === 0)
            setDisabled(true);
    }, [name.error, surname.error])

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

            {parameters.type === "create" 
                ?
                <Button disabled={disabled} onClick={addNewActor}>Add</Button>
                :
                <Button disabled={disabled} onClick={changeActor}>Change</Button>
            }
        </div>
    );
};

export default ActorForm;