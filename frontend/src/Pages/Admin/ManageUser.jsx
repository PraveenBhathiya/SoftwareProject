import React, { useState } from 'react';
import '../../CSS/AdminTools.css';
import AdminSidebar from '../Admin/Sidebar.jsx';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [searchRegNo, setSearchRegNo] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/admin/getAllStudents');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleButtonClick = () => {
    if (!showUsers) {
      fetchUserData();
    }
    setShowUsers(!showUsers);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/getStudent/${searchRegNo}`);
      const data = await response.json();
      setSearchedUser(data);
      setEditUser(data); // Initialize editUser with the fetched data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/admin/updateStudent/${editUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUser),
      });
      const data = await response.json();
      setSearchedUser(data);
      alert('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/admin/deleteStudent/${id}`, {
        method: 'DELETE',
      });
      setSearchedUser(null);
      alert('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="manageUserContainer">
      <AdminSidebar/>
      <h2>User Information</h2>
      <div className="form">
        <div className="topic">User Information for Students</div>
      <button className="toggleButton" onClick={handleButtonClick}>
        {showUsers ? 'Hide User List' : 'Show User List'}
      </button>
      {showUsers && (
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
      )}
      <div className="searchContainer">
        <h3>Search User by Reg No</h3>
        <input
          type="text"
          placeholder="Enter Reg No"
          value={searchRegNo}
          onChange={(e) => setSearchRegNo(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearch}>Search</button>
      </div>
      {searchedUser && (
        <div className="searchedUserInfo">
          <h3>Searched User</h3>
          <div className="userDetail">
            <span className="label">Username:</span>
            <input
              className="value"
              name="username"
              value={editUser ? editUser.username : ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="userDetail">
            <span className="label">Reg No:</span>
            <input
              className="value"
              name="regNo"
              value={editUser ? editUser.regNo : ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="userDetail">
            <span className="label">Email:</span>
            <input
              className="value"
              name="email"
              value={editUser ? editUser.email : ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="userDetail">
            <span className="label">Batch:</span>
            <input
              className="value"
              name="batch"
              value={editUser ? editUser.batch : ''}
              onChange={handleInputChange}
            />
          </div>
          <button className="updateButton" onClick={handleUpdateUser}>Update User</button>
          <button className="deleteButton" onClick={() => handleDeleteUser(searchedUser._id)}>Delete User</button>
        </div>
      )}
      </div>
      
    </div>
  );
};

export default ManageUser;
