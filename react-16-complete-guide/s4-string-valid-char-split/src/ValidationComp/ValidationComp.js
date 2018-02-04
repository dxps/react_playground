import React from 'react';
import './ValidationComp.css';

const ValidationComp = ({ value }) => {

    const validationMessages = [
        'Value is too short!',
        'Value is long enough'
    ];

    const validationStyles = [
        { color: 'red' },
        { color: 'green' }
    ]

    const valueLength = (value == null) ? 0 : value.length;

    const message = (valueLength < 5) ? 
        validationMessages[0] : validationMessages[1];
    
    const messageStyle = (valueLength < 5) ?
        validationStyles[0] : validationStyles[1];

    return (
        <div className="validationComp">
            <p style={messageStyle}>{message}</p>
        </div>
    );

}

export default ValidationComp;
