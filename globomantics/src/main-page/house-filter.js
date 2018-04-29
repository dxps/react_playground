import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HouseFilter extends Component {

    state = {};

    onSearchChange = (e) => {
        const country = e.target.value;
        this.props.filterHouses(country);
    };

    render() {
        const search = this.state.search;
        const countries = this.props.countries || [];

        return (
            <div className="form-group row mt-3">
                <div className="offset-md-2 col-md-4">
                    Look for your dream house in country:
                </div>
                <div className="col-md-4">
                    <select className="form-control" value={search} onChange={this.onSearchChange}>
                        {countries.map(
                            (c) => <option key={c} value={c}>{c}</option>
                        )}
                    </select>
                </div>
            </div>
        )
    }

}

HouseFilter.propTypes = {
    countries: PropTypes.array,
    filterHouses: PropTypes.func
};

export default HouseFilter;
