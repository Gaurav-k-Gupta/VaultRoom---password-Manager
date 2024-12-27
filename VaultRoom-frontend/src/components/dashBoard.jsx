import React, { useState, useEffect } from 'react';
import { FaBars, FaUser, FaLock, FaEye, FaEdit, FaTrash, FaSignOutAlt , FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashboardPage = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('profile'); // Track which page is active
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user data from backend
    fetch('http://localhost:3000/auth/user', {
      credentials: 'include', // Important to include cookies for session
    })
      .then(response => {
        if (!response.ok) throw new Error('Not authenticated');
        return response.json();
      })
      .then(data => setUser(data))
      .catch(err => console.error('Error fetching user data:', err));
  }, []);

  // Function to add a new password entry
  const handleAddPassword = () => {
    if (newPassword && newWebsite) {
      const newEntry = {
        website: newWebsite,
        password: newPassword,
      };
      setPasswords([...passwords, newEntry]);
      setNewPassword('');
      setNewWebsite('');
    }
  };

  // Handle deleting a password row with animation
  const handleDeletePassword = (index) => {
    const updatedPasswords = [...passwords];
    const passwordRow = document.getElementById(`password-row-${index}`);
    passwordRow.classList.add('deleted');

    setTimeout(() => {
      updatedPasswords.splice(index, 1);
      setPasswords(updatedPasswords);
    }, 500); // Wait for the animation to finish
  };

  // Handle editing a password (this can be extended as per your requirements)
  const handleEditPassword = (index) => {
    const passwordToEdit = passwords[index];
    setNewWebsite(passwordToEdit.website);
    setNewPassword(passwordToEdit.password);
    handleDeletePassword(index); // Remove the old entry to simulate editing
  };

  const handleLogout = () => {
    alert('Are you sure want to logout?');
    fetch('http://localhost:3000/logout', { credentials: 'include' })
      .then(response => {
        if (response.ok) {
          setUser(null);
          console.log("successful logout!");
          window.location.href = '/'; // Redirect to the login page
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch(err => console.error('Logout failed:', err));
  };


  return (
    <>
      {user ? (<div className="min-h-screen bg-[#081229] flex">
        {/* Left Sidebar with Hamburger Menu */}
        <div className="bg-[#191d3a] w-64 p-4 flex flex-col">
          {/* Logo and Title */}
          <div className="flex items-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              width="40"
              height="40"
              className="mr-2"
            >
              <circle cx="100" cy="100" r="90" fill="#ec5990" stroke="#ffffff" strokeWidth="14" />
              <circle cx="100" cy="100" r="70" fill="white" stroke="#ec5990" strokeWidth="8" />
              <circle cx="100" cy="50" r="8" fill="#ec5990" />
              <circle cx="100" cy="150" r="8" fill="#ec5990" />
              <circle cx="100" cy="100" r="30" fill="none" stroke="#ec5990" strokeWidth="8" />
              <line x1="100" y1="100" x2="100" y2="50" stroke="#ec5990" strokeWidth="6" />
              <line x1="100" y1="100" x2="50" y2="100" stroke="#ec5990" strokeWidth="6" />
              <line x1="100" y1="100" x2="150" y2="100" stroke="#ec5990" strokeWidth="6" />
              <line x1="100" y1="100" x2="100" y2="150" stroke="#ec5990" strokeWidth="6" />
            </svg>
            <h1 className="text-white text-2xl font-bold">VaultRoom</h1>
          </div>

          {/* Sidebar Menu */}
          <ul className="space-y-4">
            <li>
              <button
                className="text-white flex items-center space-x-3 hover:text-[#ec5990]"
                onClick={() => setActivePage('profile')}
              >
                <FaUser /> <span>Profile</span>
              </button>
            </li>
            <li>
              <button
                className="text-white flex items-center space-x-3 hover:text-[#ec5990]"
                onClick={() => setActivePage('savedPasswords')}
              >
                <FaLock /> <span>Saved Passwords</span>
              </button>
            </li>
            <li>
              <button
                className="text-white flex items-center space-x-3 hover:text-[#ec5990]"
                onClick={() => setActivePage('addPassword')}
              >
                <FaLock /> <span>Add New Password</span>
              </button>
            </li>
          </ul>

          {/* Logout Button */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="text-white flex items-center space-x-3 hover:text-red-500 mt-8"
            >
              <FaSignOutAlt /> <span>Logout</span>
            </button>
          </div>
        </div>


        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Profile Page */}
          {activePage === 'profile' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Profile</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <img
                  src={'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{user.displayName}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Saved Passwords Page */}
          {activePage === 'savedPasswords' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Saved Passwords</h2>
              <div className="space-y-4">
                {passwords.map((entry, index) => (
                  <div
                    key={index}
                    id={`password-row-${index}`}
                    className="password-row flex justify-between items-center p-4 bg-white rounded-md shadow-md"
                  >
                    <div>
                      <span className="font-semibold">{entry.website}</span>
                    </div>
                    <div className="space-x-4">
                      <button
                        onClick={() => handleEditPassword(index)}
                        className="text-[#ec5990] hover:text-[#c64c7a]"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeletePassword(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => setPasswordVisible(!passwordVisible)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaEye />
                      </button>
                      {passwordVisible && (
                        <div className="text-gray-700">{entry.password}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add New Password Page */}
          {activePage === 'addPassword' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Add New Password</h2>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Website"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="bg-gray-100 text-gray-800 p-3 rounded-md mb-4 w-full"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-gray-100 text-gray-800 p-3 rounded-md mb-4 w-full"
                />
                <button
                  onClick={handleAddPassword}
                  className="bg-[#ec5990] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#c64c7a]"
                >
                  Add Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      ) : (
        <div className='flex justify-center align-center'>
          <div className='w-300 my-8 p-5 bg-white h-500' style={{borderRadius:"7px" , border:"2px solid #ec5990"}}>
            <h2 className='my-3 text-large fw-700'>You must login to access the Dashboard!</h2>
            {/* <button
              
              className="w-full bg-gradient-to-r from-[#ec5990] to-[#c64c7a] text-white py-2 rounded-md hover:from-[#c64c7a] hover:to-[#ec5990] transition-all duration-300 transform hover:scale-105"
            >
              
              Login
            </button> */}
            <div className='flex justify-center align-center'><Link className="bg-[#0e101c] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#ec5990]" style={{border:"1px solid white"}} to='/login'>
            <FaSignInAlt className="inline-block mr-2" />
            Login</Link></div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;





