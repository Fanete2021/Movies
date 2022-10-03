import React from 'react';
import Button from '../Button/Button';
import cl from './actor.module.scss';

const ActorItem = function (props) {
    return (
        <div className={cl.actor}>
            <div className={cl.actor__contet}>
                <strong>{props.actor.name} {props.actor.surname}</strong>
            </div>
            
            <div className={cl.btn}>
                <Button disabled={!props.isAuth} onClick={() => props.remove(props.actor)}>
                    Delete
                </Button>
            </div>
        </div>
    );
};

export default ActorItem;