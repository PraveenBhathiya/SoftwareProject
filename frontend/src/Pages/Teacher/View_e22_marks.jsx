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



import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import TeacherSidebar from './Sidebar';
import '../../CSS/ViewMarks.css';
import '../../CSS/Marks.css';
import prof from '../../Assets/profile.png';

const Teacher_View_e22_marks = () => {
  const [menu, setMenu] = useState("Dashboard");
  const [selectedTable, setSelectedTable] = useState("table1");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState('');

  // Fetch student data from the backend on component mount 
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admin/getAllStudents');

        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setStudents(data);

          // Initialize marks state with empty values for each student
          const initialMarks = data.map(student => ({
            regNo: student.regNo,
            username: student.username,
            presentationMark: '',
            vivaMark: '',
            contributionMark: ''
          }));
          setMarks(initialMarks);
        } else {
          const text = await response.text();
          console.error('Expected JSON but received HTML:', text);
          setError('Error fetching student data. Please try again later.');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data. Please try again later.');
      }
    };

    fetchStudents();
  }, []);

  const handleTableChange = (e) => {
    setSelectedTable(e.target.value);
  };

  const handleMarkChange = (index, field, value) => {
    const newMarks = [...marks];
    newMarks[index][field] = value;
    setMarks(newMarks);
  };

  const renderTableRows = () => {
    return marks.map((mark, index) => (
      <tr key={index}>
        <td>{mark.regNo}</td>
        <td>{mark.username}</td>
        <td><input type="number" value={mark.presentationMark} onChange={(e) => handleMarkChange(index, 'presentationMark', e.target.value)} /></td>
        <td><input type="number" value={mark.vivaMark} onChange={(e) => handleMarkChange(index, 'vivaMark', e.target.value)} /></td>
        <td><input type="number" value={mark.contributionMark} onChange={(e) => handleMarkChange(index, 'contributionMark', e.target.value)} /></td>
      </tr>
    ));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/marks/saveMarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks }), // Ensure `marks` is defined and structured correctly
      });
  
      if (response.ok) {
        console.log('Marks saved successfully');
        setMarks(marks.map(mark => ({
          ...mark,
          presentationMark: '',
          vivaMark: '',
          contributionMark: ''
        })));
      } else {
        console.error('Error saving marks');
        setError('Error saving marks. Please try again later.');
      }
    } catch (error) {
      console.error('Error saving marks:', error);
      setError('Error saving marks. Please try again later.');
    }
  };
  
  return (
    <div className='marks'>
      <TeacherSidebar />
      <div className="viewmarks">
        <h1>e22-Marks</h1>
        {error && <div className="error">{error}</div>}
        <div className="profile-container">
          <div className='profile' onClick={() => { setMenu("Dashboard") }}>
            <img src={prof} alt="Profile" />
            <Link to='/profile' style={{ textDecoration: 'none' }}>Profile</Link>
            {menu === "Profile" ? <hr /> : null}
          </div>
        </div>
        
        <div className="dropdown-container">
          <label htmlFor="table-select">Select Table: </label>
          <select id="table-select" value={selectedTable} onChange={handleTableChange}>
            <option value="table1">Table 1</option>
            <option value="table2">Table 2</option>
            <option value="table3">Table 3</option>
          </select>
        </div>

        <div className="view-mark-container">
          <div className="marks1">
            <button className="mark1">1st Marks</button>
            <button className="view1">View Marks</button>
          </div>
          <div className="marks2">
            <button className="mark2">2nd Marks</button>
            <button className="view2">View Marks</button>
          </div>
          <div className="upmarks">
            <button className="up" >Upload Marks</button>
            <button className="up1" onClick={handleSubmit}>Upload Marks</button>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Reg No</th>
                <th>Name</th>
                <th>Presentation Mark</th>
                <th>Viva Mark</th>
                <th>Contribution Mark</th>
              </tr>
            </thead>
            <tbody>
              {renderTableRows()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teacher_View_e22_marks;