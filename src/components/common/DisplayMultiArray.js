import React from 'react';

/**
 * Display Multi Array
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const DisplayMultiArray = (props) => {
    let arr = props.array;

    let result = [];


    arr.map((rowArr, rowIdx) => {
        rowArr.map((item, colIdx) => {

            const divId = `${rowIdx}_${colIdx}`;

            if(item != null)
            {
                result.push(
                    <div
                        key={divId}
                        className="col-3 mb-3"
                    >
                        {item}
                    </div>
                )
            }
        })
    });

    return (
        <div className="row">
            {result}
        </div>
    );
}

export { DisplayMultiArray };
