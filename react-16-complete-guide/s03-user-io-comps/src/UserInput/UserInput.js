import React from 'react';
import './UserInput.css';

const userInput = (props) => {
    return (
        <div className="userInput">
            Name: <input type="text" autoFocus
                         value={props.username} 
                         onChange={props.usernameChangeHandler} />
        </div>
    )
}

export default userInput;
