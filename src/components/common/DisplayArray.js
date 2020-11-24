import React from 'react';

/**
 * Display Array
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DisplayArray = (props) => {
    let arr = props.array;

    let result = [];

    arr.map((item, rowIdx) => {
        if(item != null)
        {
            result.push(
                <div
                    key={rowIdx}
                    className="col-12 mb-3"
                >
                    {item}
                </div>
            )
        }
    });

    return (
        <div className="row">
            {result}
        </div>
    );
}

export { DisplayArray };