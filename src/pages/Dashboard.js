import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define FilterOptions for price and popularity
const priceOptions = [
    { value: '0-5000', label: '0-5000' },
    { value: '5000-10000', label: '5000-10000' },
    { value: '10000-20000', label: '10000-20000' },
    { value: '20000+', label: '20000+' }
];

const popularityOptions = [
    { value: '0-10000', label: '0-10000' },
    { value: '10000-30000', label: '10000-30000' },
    { value: '30000-50000', label: '30000-50000' },
    { value: '50000+', label: '50000+' }
];

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [popularityFilter, setPopularityFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/products.json');
                const products = response.data.products;
                const dataArray = Object.values(products);
                setItems(dataArray);
                setFilteredItems(dataArray);
                setLoading(false);
            } catch (error) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let filtered = items.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (priceFilter) {
            const [minPrice, maxPrice] = priceFilter.split('-').map(Number);
            filtered = filtered.filter(item => {
                const price = parseFloat(item.price);
                return maxPrice ? (price >= minPrice && price <= maxPrice) : (price >= minPrice);
            });
        }

        if (popularityFilter) {
            const [minPopularity, maxPopularity] = popularityFilter.split('-').map(Number);
            filtered = filtered.filter(item => {
                const popularity = parseFloat(item.popularity);
                return maxPopularity ? (popularity >= minPopularity && popularity <= maxPopularity) : (popularity >= minPopularity);
            });
        }

        setFilteredItems(filtered);
    }, [searchQuery, priceFilter, popularityFilter, items]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Product Dashboard</h1>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search by title"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
            />

            {/* Price Filter */}
            <select
                value={priceFilter}
                onChange={e => setPriceFilter(e.target.value)}
            >
                <option value="">Select Price Range</option>
                {priceOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Popularity Filter */}
            <select
                value={popularityFilter}
                onChange={e => setPopularityFilter(e.target.value)}
            >
                <option value="">Select Popularity Range</option>
                {popularityOptions.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Product List */}
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index}>
                        <strong>{item.title}</strong><br />
                        Price: ${item.price}<br />
                        Popularity: {item.popularity}<br />
                        Subcategory: {item.subcategory}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
