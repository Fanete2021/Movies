import React from 'react';
import Button from '../Button/Button';
import cl from './actor.module.scss';

const ActorItem = function (props) {
    const changeActor = () => {
        props.setChangeableActor(props.actor);
        props.changeStateForm("change");
    } 

    return (
        <div className={cl.actor}>
            <div className={cl.actor__contet}>
                <strong>{props.actor.name} {props.actor.surname}</strong>
            </div>
            
            <div className={cl.btns}>
                <div className={cl.btns__edit}>
                    <Button disabled={!props.isAuth} onClick={changeActor}>
                        Edit
                    </Button>
                </div>
                <div className={cl.btns__delete}>
                    <Button disabled={!props.isAuth} onClick={() => props.remove(props.actor)}>
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ActorItem;