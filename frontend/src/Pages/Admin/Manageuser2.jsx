// src/StudentSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../CSS/AdminTools.css';

const StudentSearch = () => {
    const [regNo, setRegNo] = useState('');
    const [student, setStudent] = useState(null);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/admin/getStudent/${regNo}`);
            setStudent(response.data);
            setError(null);
        } catch (err) {
            setStudent(null);
            setError('Student not found');
        }
    };

    return (
        <div>
            <h1>Search Student by Registration Number</h1>
            <input
                type="text"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="Enter registration number"
            />
            <button onClick={handleSearch}>Search</button>

            {student && (
                <div>
                    <h2>Student Details</h2>
                    <p>Name: {student.username}</p>
                    <p>Registration Number: {student.reg}</p>
                    <p>Created At: {new Date(student.createdAt).toLocaleString()}</p>
                    <p>Updated At: {new Date(student.updatedAt).toLocaleString()}</p>
                </div>
            )}

            {error && <p>{error}</p>}
        </div>
    );
};

export default StudentSearch;
