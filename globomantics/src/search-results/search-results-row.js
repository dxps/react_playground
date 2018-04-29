import React from 'react';
import PropTypes from 'prop-types';

const SearchResultsRow = (props) => {

    const setActive = (e) => {
        e.preventDefault();
        props.setActiveHouse(props.house);
    };

        return (
            <tr onClick={setActive}>
                <td>{props.house.address}</td>
                <td>{props.house.price}</td>
                <td>{props.house.likes}</td>
            </tr>
        );

};

SearchResultsRow.propTypes = {
    house: PropTypes.object,
    setActiveHouse: PropTypes.func
};

export default SearchResultsRow;
