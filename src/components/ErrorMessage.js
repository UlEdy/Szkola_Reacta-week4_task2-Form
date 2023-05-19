import { forwardRef } from 'react';

const ErrorMessage = forwardRef((props, ref) => {
    return (
        <p
            className='errorMessage'
            ref={ref}
        ></p>
    );
});

export default ErrorMessage;
