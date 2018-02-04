import React from 'react';

const userOutputStyle = {
    textAlign: 'left',
    margin: '20px',
    padding: '20px',
    border: '1px solid orange',
    borderRadius: '4px',
    width: '50%'
}

const userOutput = (props) => {

    const usernameMessage = (props.username === null) || (props.username === '') ? 
       'Username not set!' : `The username is ${props.username}`;

    return (
        // inline styling is used here
        <div style={userOutputStyle}>
            <p>Welcome to this platform!</p>
            <p>{usernameMessage}</p>
        </div>
    )

}

export default userOutput;
