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


// import { Link } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import TeacherSidebar from './Sidebar';
// import '../../CSS/ViewMarks.css';
// import '../../CSS/Marks.css';
// import prof from '../../Assets/profile.png';

// const Teacher_View_e22_marks = () => {
//   const [menu, setMenu] = useState("Dashboard");
//   const [selectedTable, setSelectedTable] = useState("proposal");
//   const [students, setStudents] = useState([]);
//   const [marks, setMarks] = useState([]);
//   const [error, setError] = useState('');

//   // Fetch student data from the backend whenever the selectedTable changes
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await fetch(`http://localhost:4000/api/admin/getStudentData?evaluationType=${selectedTable}`);
//         console.log('Fetching data from:', `http://localhost:4000/api/admin/getStudentData?evaluationType=${selectedTable}`);

//         if (response.ok) {
//           const data = await response.json();
//           console.log('Fetched data:', data); // Debugging line

//           // Check if the data has the expected structure
//           if (Array.isArray(data) && data.length > 0) {
//             // Initialize marks state with empty values for each student
//             const initialMarks = data.map(student => ({
//               regNo: student.regNo || 'N/A',
//               username: student.username || 'N/A',
//               presentationMark: student[`${selectedTable}_presentationMark`] || '',
//               vivaMark: student[`${selectedTable}_vivaMark`] || '',
//               contributionMark: student[`${selectedTable}_contributionMark`] || ''
//             }));
//             setMarks(initialMarks);
//           } else {
//             console.error('Data format is incorrect:', data);
//             setError('No student data available or incorrect data format.');
//           }
//         } else {
//           console.error('Response error:', await response.text());
//           setError('Error fetching student data. Please try again later.');
//         }
//       } catch (error) {
//         console.error('Error fetching student data:', error);
//         setError('Error fetching student data. Please try again later.');
//       }
//     };

//     fetchStudents();
//   }, [selectedTable]);

//   const handleTableChange = (e) => {
//     setSelectedTable(e.target.value);
//   };

//   const handleMarkChange = (index, field, value) => {
//     const newMarks = [...marks];
//     newMarks[index][field] = value;
//     setMarks(newMarks);
//   };

//   const handleUpload = async (index) => {
//     try {
//       const response = await fetch('http://localhost:4000/api/admin/saveMarks', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ marks: [marks[index]], evaluationType: selectedTable }), // Send only the specific mark object as an array
//       });

//       if (response.ok) {
//         console.log('Marks saved successfully');
//       } else {
//         console.error('Upload response error:', await response.text());
//         setError('Error saving marks. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error uploading marks:', error);
//       setError('Error saving marks. Please try again later.');
//     }
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/admin/saveMarks', {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ marks, evaluationType: selectedTable }), // Send the entire marks array
//       });

//       if (response.ok) {
//         console.log('All marks saved successfully');
//         // Reset marks after successful submission
//         setMarks(marks.map(mark => ({
//           ...mark,
//           presentationMark: '',
//           vivaMark: '',
//           contributionMark: ''
//         })));
//       } else {
//         console.error('Submit response error:', await response.text());
//         setError('Error saving marks. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error submitting marks:', error);
//       setError('Error saving marks. Please try again later.');
//     }
//   };

//   const renderTableRows = () => {
//     return marks.map((mark, index) => (
//       <tr key={index}>
//         <td>{mark.regNo || 'N/A'}</td> {/* Display Registration No */}
//         <td>{mark.username || 'N/A'}</td> {/* Display Username */}
//         <td>
//           <input 
//             type="number" 
//             value={mark.presentationMark} 
//             onChange={(e) => handleMarkChange(index, 'presentationMark', e.target.value)} 
//           />
//         </td>
//         <td>
//           <input 
//             type="number" 
//             value={mark.vivaMark} 
//             onChange={(e) => handleMarkChange(index, 'vivaMark', e.target.value)} 
//           />
//         </td>
//         <td>
//           <input 
//             type="number" 
//             value={mark.contributionMark} 
//             onChange={(e) => handleMarkChange(index, 'contributionMark', e.target.value)} 
//           />
//         </td>
//         <td>
//           <button 
//             className="upload-button" 
//             onClick={() => handleUpload(index)}
//           >
//             Upload
//           </button>
//         </td>
//       </tr>
//     ));
//   };

//   // Determine the title based on the selected evaluation type
//   const getTitle = () => {
//     switch (selectedTable) {
//       case 'proposal':
//         return 'Proposal Evaluation Marks';
//       case 'progress':
//         return 'Progress Evaluation Marks';
//       case 'final':
//         return 'Final Evaluation Marks';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className='marks'>
//       <TeacherSidebar />
//       <div className="viewmarks">
//         {error && <div className="error">{error}</div>}
//         <div className="profile-container">
//           <div className='profile' onClick={() => { setMenu("Dashboard") }}>
//             <img src={prof} alt="Profile" />
//             <Link to='/profile' style={{ textDecoration: 'none', color: '#666' }}>
//               <p>Haris</p>
//             </Link>
//           </div>
//         </div>
//         <div className="table-selection">
//           <label>Select Evaluation Type:</label>
//           <select value={selectedTable} onChange={handleTableChange}>
//             <option value="proposal">Proposal</option>
//             <option value="progress">Progress</option>
//             <option value="final">Final</option>
//           </select>
//         </div>

//         <h1>{getTitle()}</h1>
//         <table className="marks-table">
//           <thead>
//             <tr>
//               <th>Reg No</th>
//               <th>Username</th>
//               <th>Presentation Mark</th>
//               <th>Viva Mark</th>
//               <th>Contribution Mark</th>
//               <th>Upload</th>
//             </tr>
//           </thead>
//           <tbody>
//             {renderTableRows()}
//           </tbody>
//         </table>
//         <button className="submit-button" onClick={handleSubmit}>Submit All</button>
//       </div>
//     </div>
//   );
// };

// export default Teacher_View_e22_marks;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TeacherSidebar from './Sidebar';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Success icon
import '../../CSS/ViewMarksTable.css'; // Updated CSS import
import prof from '../../Assets/profile.png';

const Teacher_View_e22_marks = () => {
  const [menu, setMenu] = useState("Dashboard");
  const [selectedTable, setSelectedTable] = useState("proposal");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');  // New state for success message

  // Fetch student data from the backend whenever the selectedTable changes
  useEffect(() => {
    const fetchStudents = async () => {
      setError('');  // Clear error when making a new request
      try {
        const response = await fetch(`http://localhost:4000/api/admin/getStudentData?evaluationType=${selectedTable}`);
        console.log('Fetching data from:', `http://localhost:4000/api/admin/getStudentData?evaluationType=${selectedTable}`);

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data);

          if (Array.isArray(data) && data.length > 0) {
            const initialMarks = data.map(student => ({
              regNo: student.regNo,
              username: student.username,  // Fix this based on backend response
              presentationMark: student[`${selectedTable}_presentationMark`] || '',
              vivaMark: student[`${selectedTable}_vivaMark`] || '',
              contributionMark: student[`${selectedTable}_contributionMark`] || ''
            }));
            setMarks(initialMarks);
          } else {
            setError('No student data available or incorrect data format.');
          }
        } else {
          const errorMessage = await response.text();
          setError(errorMessage || 'Error fetching student data.');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Error fetching student data. Please try again later.');
      }
    };

    fetchStudents();
  }, [selectedTable]);

  const handleTableChange = (e) => {
    setError('');  // Clear the error when table is changed
    setSelectedTable(e.target.value);
  };

  const handleMarkChange = (index, field, value) => {
    const newMarks = [...marks];
    newMarks[index][field] = value;
    setMarks(newMarks);
  };

  const handleUpload = async (index) => {
    setError('');  // Clear the error when attempting to upload
    setSuccess(''); // Clear previous success messages

    try {
      const response = await fetch('http://localhost:4000/api/admin/saveMarks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks: [marks[index]], evaluationType: selectedTable }),
      });

      if (response.ok) {
        setSuccess('Marks saved successfully');
        setTimeout(() => setSuccess(''), 3000); // Clear the success message after 3 seconds
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Error saving marks.');
      }
    } catch (error) {
      console.error('Error uploading marks:', error);
      setError('Error saving marks. Please try again later.');
    }
  };

  // const handleSubmit = async () => {
  //   setError('');  // Clear the error when submitting
  //   setSuccess(''); // Clear previous success messages

  //   try {
  //     const response = await fetch('http://localhost:4000/api/admin/saveMarks', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ marks, evaluationType: selectedTable }),
  //     });

  //     if (response.ok) {
  //       setSuccess('All marks saved successfully');
  //       setTimeout(() => setSuccess(''), 3000); // Clear the success message after 3 seconds
  //       setMarks(marks.map(mark => ({
  //         ...mark,
  //         presentationMark: '',
  //         vivaMark: '',
  //         contributionMark: ''
  //       })));
  //     } else {
  //       const errorMessage = await response.text();
  //       setError(errorMessage || 'Error saving marks.');
  //     }
  //   } catch (error) {
  //     console.error('Error submitting marks:', error);
  //     setError('Error saving marks. Please try again later.');
  //   }
  // };


  const handleSubmit = async () => {
    setError('');  // Clear the error when submitting
    try {
      const response = await fetch('http://localhost:4000/api/admin/saveMarks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ marks, evaluationType: selectedTable }),
      });
  
      if (response.ok) {
        console.log('All marks saved successfully');
        // Add a success message instead of resetting the marks
        setSuccess('All marks saved successfully');  // Show success message in the error field or use a success state if needed
        setTimeout(() => setSuccess(''), 3000);
      } else {
        const errorMessage = await response.text();
        setError(errorMessage || 'Error saving marks.');
        setTimeout(() => setError(''), 3000);
      }
    } catch (error) {
      console.error('Error submitting marks:', error);
      setError('Error saving marks. Please try again later.');
    }
  };
  

  const renderTableRows = () => {
    return marks.map((mark, index) => (
      <tr key={index}>
        <td>{mark.regNo || 'N/A'}</td>
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
        {error && (
          <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert sx={{ mt: 5 }} severity="success" icon={<CheckCircleIcon />}>
            {success}
          </Alert>
        )}
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

        
        <div className="title-container">
         
          <h1>{getTitle()}</h1>
        </div>
        <div className="table-container">
          <table className="marks-table">
            <thead>
              <tr>
                <th>Reg No</th>
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
        </div>
        <button className="submit-button" onClick={handleSubmit}>Submit All</button>
      </div>
    </div>
  );
};

export default Teacher_View_e22_marks;
