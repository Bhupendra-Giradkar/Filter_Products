import React from 'react';

const Filters = ({ setPriceRange, setPopularityRange }) => {
    return (
        <div>
            <select onChange={(e) => setPriceRange(e.target.value)}>
                <option value="">Select Price Range</option>
                <option value="0-5000">0-5000</option>
                <option value="5000-10000">5000-10000</option>
                <option value="10000-20000">10000-20000</option>
                <option value="20000+">20000+</option>
            </select>
            <select onChange={(e) => setPopularityRange(e.target.value)}>
                <option value="">Select Popularity Range</option>
                <option value="0-10000">0-10000</option>
                <option value="10000-30000">10000-30000</option>
                <option value="30000-50000">30000-50000</option>
                <option value="50000+">50000+</option>
            </select>
        </div>
    );
};

export default Filters;
