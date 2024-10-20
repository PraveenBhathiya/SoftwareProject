import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentSidebar from './Sidebar';
import '../../CSS/Marks.css';
import prof from '../../Assets/profile.png';

const Student_View_marks = () => {
    const [marks, setMarks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchMarks = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/admin/getMarks', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch marks');
                }

                const data = await response.json();
                setMarks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMarks();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='viewmark'>
            <StudentSidebar/>
            <div className="marks-container">
                <div className="title1">View Your Marks</div>
                <div className="profile-container">
                    <img src={prof} alt="Profile" />
                </div>
                <div className="marks-box">
                    <div className="prop">
                        <p>Proposal Evaluation</p>
                        <h1>{marks?.proposalEvaluation || "Not yet"}</h1>
                    </div>
                    <div className="prog">
                        <p>Progress Evaluation</p>
                        <h1>{marks?.progressEvaluation || "Not yet"}</h1>
                    </div>
                    <div className="fin">
                        <p>Final Evaluation</p>
                        <h1>{marks?.finalEvaluation || "Not yet"}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Student_View_marks;
