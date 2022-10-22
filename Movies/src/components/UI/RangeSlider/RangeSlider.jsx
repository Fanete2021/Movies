import React from 'react';
import { useState, useRef } from 'react';
import cl from './rangeSlider.module.scss';

const RangeSlider = function (props) {
    const [visible, setVisible] = useState(false);
    const headerClasses = [cl.header]
    const [selectedMin, setSelectedMin] = useState(props.min);
    const [selectedMax, setSelectedMax] = useState(props.max);
    const progressRef = useRef();

    if (visible) {
        headerClasses.push(cl.active);
    }

    const changeProgress = (min, max) =>{
        progressRef.current.style.left = (min - props.min) / (props.max - props.min) * 100 + '%';
        progressRef.current.style.right = 100 - ((max - props.min) / (props.max - props.min)) * 100 + '%';
    }
    
    const changeMin = (e) => {
        if(parseInt(e.target.value) <= parseInt(selectedMax))
        {
            changeProgress(e.target.value, selectedMax);
            setSelectedMin(e.target.value);
            props.setMin(e.target.value);
        }
        else
        {
            setSelectedMin(selectedMax);
            changeProgress(selectedMax, selectedMax);
        }
    }

    const changeMax = (e) => {
        if(parseInt(e.target.value) >= parseInt(selectedMin))
        {
            changeProgress(selectedMin, e.target.value);
            setSelectedMax(e.target.value);
            props.setMax(e.target.value);
        }
        else
        {
            setSelectedMax(selectedMin);
            changeProgress(selectedMin, selectedMin);
        }
    }

    return (
        <div className={cl.wrapper}>
            <header onClick={() => setVisible(!visible)} className={headerClasses.join(' ')}>
                <strong>Premiere year</strong>
            </header>

            {visible &&
                <div>
                    <div className={cl.values}>
                        <div className={cl.values__field}>
                            <span>{selectedMin}</span>
                        </div>

                        <div className={cl.values__separator}>-</div>

                        <div className={cl.values__field}>
                            <span>{selectedMax}</span>
                        </div>
                    </div>

                    <div className={cl.slider}>
                        <div className={cl.slider__progress} ref={progressRef}></div>
                    </div>

                    <div className={cl.rangeInp}>
                        <input 
                            type="range" 
                            min={props.min} 
                            max={props.max} 
                            value={selectedMin}
                            onChange={changeMin}>    
                        </input>

                        <input
                            type="range"
                            min={props.min} 
                            max={props.max} 
                            value={selectedMax}
                            onChange={changeMax}>    
                        </input>
                    </div>
                </div>
            }
        </div>
    );
};

export default RangeSlider;