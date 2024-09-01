import React, { useState } from 'react';
import AdminSidebar from '../Admin/Sidebar.jsx';
import '../../CSS/AdminTools.css';

const ManageUsers = () => {
  // State for adding users
  const [user, setUser] = useState({
    firstName: '',
    fullName: '',
    registrationNumber: '',
    batch: '',
    designation: '',
  });

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  // State for searching users
  const [searchRegNo, setSearchRegNo] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);

  // Handle input changes for adding users
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  // Handle input changes for editing searched users
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  // Function to add users
  const handleAddUser = () => {
    setUsers([...users, user]);
    setMessage('User added successfully!');
    setUser({
      firstName: '',
      fullName: '',
      registrationNumber: '',
      batch: '',
      designation: '',
    });
  };

  // Function to search users by registration number
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

  // Function to update the searched user
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

  // Function to delete the searched user
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
      <AdminSidebar />

      {/* Search User Section */}
      <div className="searchSection">
        <h2>Search User by Registration Number</h2>
        <input
          type="text"
          placeholder="Enter Registration Number"
          value={searchRegNo}
          onChange={(e) => setSearchRegNo(e.target.value)}
        />
        <button className="searchButton" onClick={handleSearch}>Search</button>

        {searchedUser && (
          <div className="searchedUserInfo">
            <h3>Searched User</h3>
            <div className="userDetail">
              <span className="label">Username:</span>
              <input
                className="value"
                name="username"
                value={editUser ? editUser.username : ''}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="userDetail">
              <span className="label">Reg No:</span>
              <input
                className="value"
                name="regNo"
                value={editUser ? editUser.regNo : ''}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="userDetail">
              <span className="label">Email:</span>
              <input
                className="value"
                name="email"
                value={editUser ? editUser.email : ''}
                onChange={handleEditInputChange}
              />
            </div>
            <div className="userDetail">
              <span className="label">Batch:</span>
              <input
                className="value"
                name="batch"
                value={editUser ? editUser.batch : ''}
                onChange={handleEditInputChange}
              />
            </div>
            <button className="updateButton" onClick={handleUpdateUser}>Update User</button>
            <button className="deleteButton" onClick={() => handleDeleteUser(searchedUser._id)}>Delete User</button>
          </div>
        )}
      </div>

      {/* Add User Section */}
      <div className="main1">
        <div className="topic1">Manage Users</div>
        <div className="inputForm">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={user.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name with initials"
            value={user.fullName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number"
            value={user.registrationNumber}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="batch"
            placeholder="Batch"
            value={user.batch}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={user.designation}
            onChange={handleInputChange}
          />
          <button onClick={handleAddUser}>Add User</button>
          {message && <p className="successMessage">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
