import React, { useState, useEffect } from 'react';
import { FaBars, FaUser, FaLock, FaEye, FaEyeSlash , FaEdit, FaTrash, FaSignOutAlt , FaSignInAlt } from 'react-icons/fa';
import { Link , useLocation, useNavigate } from 'react-router-dom';
import { handleSuccess , handleEroor } from './toaster';
import { ToastContainer } from 'react-toastify';
import Loader from './loader.jsx';

const DashboardPage = ({ onLogout }) => {
  const [activePage, setActivePage] = useState('profile'); // Track which page is active
  const [passwords, setPasswords] = useState([]);
  const [passwords1, setPasswords1] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [newWebsite, setNewWebsite] = useState('');
  const [user, setUser] = useState(false);
  const [userName, setuserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [jwToken , setjwToken] = useState(false);
  const [showPass , setShowPass] = useState(false);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [updatePass , setupdatePass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [zeroPasswords , setzeroPass] = useState(false);
  

  const togglePasswordVisibility = (index) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle visibility for the specific password
    }));
  };



  const navigate = useNavigate();
  const location = useLocation();

    useEffect(() => {
        setuserName(localStorage.getItem('loggedInUserName'));
        setuserEmail(localStorage.getItem('loggedInUserEmail'));
        setjwToken(localStorage.getItem('token'));

        const token = localStorage.getItem('token');
        if(token == '') setUser(false);
        else setUser(true);

        console.log('Hii');
    }, [navigate , location])

    const fetchPasswords = async(e)=>{
      try{
        const email = userEmail;
        const url = "http://localhost:8080/cred/fetch";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              email : email
            })
        })
        if(response.status == 404){
          setPasswords([]);
          setzeroPass(true);
          return;
        }
        
        const result = await response.json();
        const {data , success , message , error} = result;
        console.log(data);
        if(data.length == 0) setzeroPass(true);
        else setzeroPass(false);
        setPasswords(data);
        setPasswords1(data);
      }catch(err){
        console.log(err);
      }
    }


    useEffect(()=>{
      if(activePage == 'savedPasswords'){
        console.log('fetching data...')
        fetchPasswords();
      }
    },[activePage])

  // Function to add a new password entry
  const handleAddPassword = async(e) => {
    e.preventDefault();
    const email = userEmail;
    const website = newWebsite; 
    const password = newPassword;
    if(!website || !password){
        return handleEroor("All fields are mandatory!");
    }
    try{
      const url = "http://localhost:8080/cred/save";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              email : email,
              website : website,
              password : password
            })
        })
        const result = await response.json();
        const {success , message , error} = result;
        if(success){
          handleSuccess(message);
          setNewPassword('');
          setNewWebsite('');
          await fetchPasswords();
        }
        else handleEroor(message);
    }catch(err){
      handleEroor(err)
    }
  };



  const handleupdatePass = async (e)=>{
    e.preventDefault();
    const email = userEmail;
    const website = newWebsite;
    const newPass = newPassword;


    if(!website || !newPass){
      return handleEroor("All fields are mandatory!");
    }
    try{
      const url = "http://localhost:8080/cred/update";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              email : email,
              website : website,
              newPassword : newPass
            })
        })
        const result = await response.json();
        const {success , message , error} = result;
        if(success){
          handleSuccess(message);
          setNewPassword('');
          setNewWebsite('');
          setupdatePass(false);
          await fetchPasswords();

        }
        else handleEroor(message);
    }catch(err){
      handleEroor(err)
    }
  }

  const handleDeletePass = async(web)=>{
    // e.preventDefault();
    const email = userEmail;
    const website = web;

    try{
      const url = "http://localhost:8080/cred/delete";
        const response = await fetch(url,{
            method:"POST",
            headers:{
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({
              email : email,
              website : website
            })
        })
        const result = await response.json();
        const {success , message , error} = result;
        if(success){
          handleSuccess(message);

          await fetchPasswords();

          

        }
        else handleEroor(message);
    }catch(err){
      handleEroor(err)
    }
  }


  const handleDeletePassword = (index) => {
    const website = passwords[index].website;
    setIsLoading(true);
    setTimeout(()=>{
      setIsLoading(false);     
    },2000)
    handleDeletePass(website);
    
  };

  // Handle editing a password (this can be extended as per your requirements)
  const handleEditPassword = (index) => {
    const passwordToEdit = passwords[index];
    setNewWebsite(passwordToEdit.website);
    setNewPassword(passwordToEdit.password);
    // Remove the old entry to simulate editing
    setTimeout(()=>{
      setActivePage('addPassword');
    },1000)
    setupdatePass(true);
  };

  const handleLogout = () => {
    alert('Are you sure want to logout?');
    localStorage.removeItem('loggedInUserName')
        localStorage.removeItem('loggedInUserEmail')
        localStorage.removeItem('token')
        handleSuccess('Successfully logged out');
        setTimeout(() => {
            navigate('/');
        }, 1400)
  };


  return (
    <>
      {isLoading && <Loader />}
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
                  <h3 className="text-xl font-semibold">{userName}</h3>
                  <p className="text-gray-600">{userEmail}</p>
                </div>
              </div>
            </div>
          )}

          {/* Saved Passwords Page */}
          {activePage === 'savedPasswords' && (
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Saved Passwords</h2>

              {zeroPasswords ? 
              <p className="text-center text-gray-500 mt-10 fw-bold" style={{fontSize:'20px'}}>
              {"No Passwords found! "}
              <button
                onClick={()=>{setActivePage('addPassword')}}
                className="text-[#ec5990] hover:underline font-bold p-2"
              >
                add new
              </button>
            </p>
              : <div className="space-y-4">
                {passwords.map((entry, index) => (
                  <div
                    key={index}
                    id={`password-row-${index}`}
                    className="password-row flex justify-between items-center p-4 bg-white rounded-md shadow-md"
                    style={{border: '2px solid #ec5990'}}
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
                        onClick={()=>{handleDeletePassword(index)}}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => togglePasswordVisibility(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {visiblePasswords[index] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      {visiblePasswords[index] && (
                        <div className="text-gray-700 font-semibold">{entry.password}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>}
            </div>
          )}

          {/* Add New Password Page */}
          {activePage === 'addPassword' && (
            <div>
              {updatePass ? <h2 className="text-3xl font-bold text-white mb-6">Update Password</h2> : <h2 className="text-3xl font-bold text-white mb-6">Add New Password</h2>}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <input
                  type="text"
                  placeholder="Website"
                  value={newWebsite}
                  readOnly={updatePass}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="bg-gray-200 text-gray-800 p-3 rounded-md mb-4 w-full"
                />
                <div className='relative flex '>
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-200 text-gray-800 p-3 rounded-md w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="relative right-7"
                  >
                    {showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {updatePass ? 
                  <button
                  onClick={handleupdatePass}
                  className="bg-[#ec5990] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#c64c7a] mt-5"
                >
                  Update Password
                </button>
                : 
                <button
                onClick={handleAddPassword}
                className="bg-[#ec5990] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#c64c7a] mt-5"
              >
                Add Password
              </button>}
                {/* <button
                  onClick={handleAddPassword}
                  className="bg-[#ec5990] text-white px-6 py-3 rounded-md shadow-md hover:bg-[#c64c7a] mt-5"
                >
                  Add Password
                </button> */}
              </div>
            </div>
          )}
        </div>
        <ToastContainer/>
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





