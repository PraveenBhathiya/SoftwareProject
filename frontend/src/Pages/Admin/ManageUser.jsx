import {React, useState, useEffect} from 'react';
import '../../CSS/AdminTools.css';


const ManageUser = () => {
  const [users, setUsers] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/getAllStudents');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="manageUserContainer">
      <h2 className="title">User Information</h2>
      <div className="userList">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="userInfo">
              <div className="userDetail">
                <span className="label">Username:</span>
                <span className="value">{user.username}</span>
              </div>
              <div className="userDetail">
                <span className="label">Reg No:</span>
                <span className="value">{user.regNo}</span>
              </div>
              <div className="userDetail">
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
              </div>
              <div className="userDetail">
                <span className="label">Batch:</span>
                <span className="value">{user.batch}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No user data fetched yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageUser;


 
