// import { Link } from 'react-router-dom';
// import React, { useState } from 'react';
// import TeacherSidebar from './Sidebar';
// import '../../CSS/ViewMarks.css';
// import '../../CSS/Marks.css';
// import prof from '../../Assets/profile.png';

// const Teacher_View_e22_marks = () => {

//   const [menu, setMenu] = useState("Dashboard");

//   return (
//     <div className='marks'>
//       <TeacherSidebar/>
 
//          <div className="viewmarks">
         
//           <h1>e22-Marks</h1>
//           <div className="profile-container">
//                     <div className='profile' onClick={() => { setMenu("Dashboard") }}>
//                         <img src={prof} alt="" />
//                         <Link to='/profile' style={{ textDecoration: 'none' }}>Profile</Link>
//                         {menu === "Profile" ? <hr /> : null}
//                     </div>
//           </div>
//           <div className="view-mark-container">
//             <div className="marks1">
//               <div className="mark1">1st Marks</div>
//               <div className="view1">View Marks</div>
//             </div>
//             <div className="marks2">
//               <div className="mark2">2nd Marks</div>
//               <div className="view2">View Marks</div>
//             </div>
//             <div className="upmarks">
//               <div className="up">Upload Marks</div>
//               <div className="up1">Upload Marks</div>
//             </div>
//           </div>
//          </div>
//     </div>
//   )
// }

// export default Teacher_View_e22_marks;




////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////


import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TeacherSidebar from './Sidebar';
import '../../CSS/ViewMarks.css';
import '../../CSS/Marks.css';
import prof from '../../Assets/profile.png';

const Teacher_View_e22_marks = () => {
  const [menu, setMenu] = useState("Dashboard");
  const [selectedTable, setSelectedTable] = useState("proposal");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState('');

  // Fetch student data from the backend whenever the selectedTable changes
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/admin/getStudentData?evaluationType=${selectedTable}`);

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data); // Debugging line

          // Initialize marks state with empty values for each student
          const initialMarks = data.map(student => ({
            regNo: student.regNo,
            username: student.username,
            presentationMark: student[`${selectedTable}_presentationMark`] || '',
            vivaMark: student[`${selectedTable}_vivaMark`] || '',
            contributionMark: student[`${selectedTable}_contributionMark`] || ''
          }));
          setMarks(initialMarks);
        } else {
          setError('Error fetching student data. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data. Please try again later.');
      }
    };

    fetchStudents();
  }, [selectedTable]);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleMarkChange = (index, field, value) => {
    const newMarks = [...marks];
    newMarks[index][field] = value;
    setMarks(newMarks);
  };

  const handleUpload = async (index) => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/saveMarks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks: [marks[index]], evaluationType: selectedTable }), // Send only the specific mark object as an array
      });
  
      if (response.ok) {
        console.log('Marks saved successfully');
      } else {
        setError('Error saving marks. Please try again later.');
      }
    } catch (error) {
      setError('Error saving marks. Please try again later.');
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/saveMarks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks, evaluationType: selectedTable }), // Send the entire marks array
      });
  
      if (response.ok) {
        console.log('All marks saved successfully');
        // Reset marks after successful submission
        setMarks(marks.map(mark => ({
          ...mark,
          presentationMark: '',
          vivaMark: '',
          contributionMark: ''
        })));
      } else {
        setError('Error saving marks. Please try again later.');
      }
    } catch (error) {
      setError('Error saving marks. Please try again later.');
    }
  };

  const renderTableRows = () => {
    return marks.map((mark, index) => (
      <tr key={index}>
        <td>{mark.regNo || 'N/A'}</td> {/* Display Registration No */}
        <td>{index.username || 'N/A'}</td> {/* Display Username */}
        <td>
          <input 
            type="number" 
            value={mark.presentationMark} 
            onChange={(e) => handleMarkChange(index, 'presentationMark', e.target.value)} 
          />
        </td>
        <td>
          <input 
            type="number" 
            value={mark.vivaMark} 
            onChange={(e) => handleMarkChange(index, 'vivaMark', e.target.value)} 
          />
        </td>
        <td>
          <input 
            type="number" 
            value={mark.contributionMark} 
            onChange={(e) => handleMarkChange(index, 'contributionMark', e.target.value)} 
          />
        </td>
        <td>
          <button 
            className="upload-button" 
            onClick={() => handleUpload(index)}
          >
            Upload
          </button>
        </td>
      </tr>
    ));
  };

  // Determine the title based on the selected evaluation type
  const getTitle = () => {
    switch (selectedTable) {
      case 'proposal':
        return 'Proposal Evaluation Marks';
      case 'progress':
        return 'Progress Evaluation Marks';
      case 'final':
        return 'Final Evaluation Marks';
      default:
        return '';
    }
  };

  return (
    <div className='marks'>
      <TeacherSidebar />
      <div className="viewmarks">
        
        {error && <div className="error">{error}</div>}
        <div className="profile-container">
          <div className='profile' onClick={() => { setMenu("Dashboard") }}>
            <img src={prof} alt="Profile" />
            <Link to='/profile' style={{ textDecoration: 'none', color: '#666' }}>
              <p>Haris</p>
            </Link>
          </div>
        </div>
        <div className="table-selection">
          <label>Select Evaluation Type:</label>
          <select value={selectedTable} onChange={handleTableChange}>
            <option value="proposal">Proposal</option>
            <option value="progress">Progress</option>
            <option value="final">Final</option>
          </select>
        </div>

        <h1>{getTitle()}</h1>
        <table className="marks-table">
          <thead>
            <tr>
              <th>Reg No</th>
              <th>Username</th>
              <th>Presentation Mark</th>
              <th>Viva Mark</th>
              <th>Contribution Mark</th>
              <th>Upload</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
        <button className="submit-button" onClick={handleSubmit}>Submit All</button>
      </div>
    </div>
  );
};

export default Teacher_View_e22_marks;
