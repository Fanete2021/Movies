import { useState } from 'react'
import useValidation from './useValidataion';

function useInput(initialValue, validations) {
    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = useValidation(value, validations);

    const onChange = (e) => {
        setValue(e.target.value);
    }

    const onBlur = (e) => {
        setIsDirty(true);
    }

    const resetInput = () => {
        setValue("");
        setIsDirty(false);
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        resetInput,
        ...valid
    }
}

export default useInput;