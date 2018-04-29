import React from 'react';
import PropTypes from 'prop-types';
import House from '../house';

const FeaturedHouse = props => {

    if (props.house) {
        return (
            <div>
                <div className="row featuredHouse">
                    <h3 className="col-md-12 text-center">
                        Featured house
                    </h3>
                </div>
                <House house={props.house}/>
            </div>
        );
    } else {
        return (<div>No featured house at this time</div>)
    }

};

FeaturedHouse.propTypes = {
    house: PropTypes.object
};

export default FeaturedHouse;
