import { useEffect, useState } from 'react';

function useValidation(value, validations) {
    const [error, setError] = useState("");
    
    useEffect(() => {
        setError("");

        for(const validation in validations) {
            switch (validation) {
                case 'length':
                    if (value.length < validations[validation].min || value.length > validations[validation].max)
                        setError(`The field must contain from ${validations[validation].min} to ${validations[validation].max} characters`);
                    break;
                case 'isEmpty':
                    if (!value)
                        setError("The field cannot be empty");
                    break;
                case 'regex':
                    if (value && !validations[validation].test(value))
                        setError("Contains invalid characters");
                    break;
                case 'repeat':
                    if (validations[validation] !== value)
                        setError("The values don't match");
                    break;
                case 'range':
                    if (parseInt(value) < validations[validation].min || parseInt(value) > validations[validation].max)
                        setError(`The value is not in the range from ${validations[validation].min} to ${validations[validation].max}`);
                    break;
                default:
                    break;
            }

            if (error)
                break;
        }
    }, [value])

    return {
        error
    }
}

export default useValidation;