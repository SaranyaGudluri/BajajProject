import React, { useState } from 'react';
import './App.css';
const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleInputChange = (e) => {
        setJsonInput(e.target.value);
    };
    const handleFilterChange = (e) => {
        const options = Array.from(e.target.selectedOptions).map(option => option.value);
        setSelectedFilters(options);
    };

    const handleSubmit = async () => {
        setError('');
        setResponseData(null);

        try {
            JSON.parse(jsonInput);
            const response = await fetch('bajaj-project-q5pe3fulu-saranyagudluris-projects.vercel.app', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: jsonInput,
            });

            const data = await response.json();
            const filteredData = data.filter(item =>
                (selectedFilters.includes('Alphabets') && /[a-zA-Z]/.test(item)) ||
                (selectedFilters.includes('Numbers') && /[0-9]/.test(item)) ||
                (selectedFilters.includes('Highest lowercase alphabet') && /[a-z]/.test(item))
            );

            setResponseData(filteredData);

        } catch (err) {
            setError('Invalid JSON input or API error');
        }
    };
    return (
        <div className="container">
            <h1>JSON API Client</h1>
            <input
                type="text"
                value={jsonInput}
                onChange={handleInputChange}
                placeholder="Enter JSON data"
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <div className="error">{error}</div>}
            <select multiple onChange={handleFilterChange}>
                <option value="Alphabets">Alphabets</option>
                <option value="Numbers">Numbers</option>
                <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
            </select>
            <div className="response">
                {responseData && responseData.map((item, index) => <div key={index}>{item}</div>)}
            </div>
        </div>
    );
};

export default App;
