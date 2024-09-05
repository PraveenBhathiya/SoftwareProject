import React, { useState } from 'react';
import AdminSidebar from '../Admin/Sidebar.jsx';
import '../../CSS/AdminTools.css';
import { InputField, SubmitButton } from '../../Styles/AdminRegisterStyles.js';
import { Alert } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';


const ManageUsers = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('student'); // Default role is 'student'

  // State for searching users
  const [searchRegNo, setSearchRegNo] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setFormData({}); // Reset form data when role changes
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate common fields
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("All required fields must be filled!");
    }

    // Additional validation for students
    if (role === 'student' && (!formData.regNo || !formData.batch)) {
      return setErrorMessage("Registration number and batch are required for students!");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("http://localhost:4000/api/admin/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, role }),
      });

      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);

      if (res.ok) {
        alert('User updated successfully');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };


  // Handle input changes for editing searched users
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
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

        <label>
          Select Role:
          <select onChange={handleRoleChange} value={role}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </label>

        <InputField
          type='email'
          placeholder='Username'
          id="username"
          onChange={handleChange}
          required
        />

        <InputField
          type='email'
          placeholder='Email'
          id='email'
          onChange={handleChange}
          required
        />
        {role === 'student' && (
          <>
            <InputField
              type='email'
              placeholder='Registration Number'
              id='regNo'
              onChange={handleChange}
              required
            />

            <InputField
              type='email'
              placeholder='Batch'
              id='batch'
              onChange={handleChange}
              required
            />
          </>
        )}
        <InputField
          type='password'
          placeholder='Password'
          id='password'
          onChange={handleChange}
          required
        />
        <SubmitButton
          type='button'
          onClick={handleSubmit}
          disabled={loading}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {loading ? "Loading..." : "Register"}
        </SubmitButton>

        {errorMessage && (
        <Alert sx={{ mt: 5 }} severity="error" icon={<ErrorIcon />}>
          {errorMessage}
        </Alert>
      )}
          
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
