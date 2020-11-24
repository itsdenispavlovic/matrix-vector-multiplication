import React from 'react';

/**
 * Button
 *
 * @param onClick
 * @param text
 * @param nameClass
 * @returns {JSX.Element}
 * @constructor
 */
const Button = ({onClick, text, nameClass}) => {
    return (
        <button
            className={`btn btn-${nameClass}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export { Button };