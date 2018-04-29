import React from 'react';
import PropTypes from 'prop-types';
import SearchResultsRow from './search-results-row';

const SearchResults = (props) => {

    const searchResultsRows = props.filteredHouses.map(h =>
        <SearchResultsRow
            key={h.id.toString()}
            house={h}
            setActiveHouse={props.setActiveHouse} />
    );

    return (
        <div className="mt-2">
            <h4>Results for {props.country}: </h4>
            <table className="table table-hover">
                <tbody>
                    {searchResultsRows}
                </tbody>
            </table>
        </div>
    );

};

SearchResults.propTypes = {
    filteredHouses: PropTypes.array,
    country: PropTypes.string,
    setActiveHouse: PropTypes.func
};

export default SearchResults;
