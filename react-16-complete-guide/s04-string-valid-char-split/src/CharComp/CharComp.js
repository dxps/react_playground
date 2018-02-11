import React from 'react';
import './CharComp.css';

const CharComp = ({char, idx, charDeleteHandler}) => {

    return (
        <div className="charComp"
            onClick={ (idx) => charDeleteHandler(idx) }>
            {char}
        </div>
    );

}

export default CharComp;
