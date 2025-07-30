import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import backgroundImage from '../assets/images/one.jpg'; // Add your background image here


function ProfilePage() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    contact_number: '',
    profile_image: '',
    age: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [initialUser, setInitialUser] = useState({}); // Store initial user data to detect changes
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/check-auth', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        if (response.data.isLoggedIn) {
          const fetchedUser = response.data.user;
          setUser(fetchedUser);
          setInitialUser({ ...fetchedUser }); // Store initial state
        }
      } catch (err) {
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setUser((prev) => ({ ...prev, profile_image: file })); // Keep as File object for FormData
    }
  };

  const handleSave = async () => {
    // Check if any field (except profile_image) has been edited
    const isEdited = Object.keys(user).some((key) =>
      key !== 'profile_image' && user[key] !== initialUser[key]
    );
    // Check if profile image is not updated
    if (isEdited && !previewImage && !user.profile_image) {
      if (!window.confirm('You have edited information. Please update your profile picture. Do you want to continue saving without it?')) {
        return; // Cancel save if user declines
      }
    }
    const formData = new FormData();
    Object.keys(user).forEach((key) => {
      if (key === 'profile_image' && user.profile_image instanceof File) {
        formData.append(key, user.profile_image); // Append new File if selected
      } else if (key !== 'profile_image') {
        formData.append(key, user[key] || ''); // Append other fields
      }
    });
    try {
      const response = await api.post('/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditing(false);
      alert(response.data.message);
      // Refresh user data and initial state
      const updatedResponse = await api.get('/check-auth', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUser(updatedResponse.data.user);
      setInitialUser({ ...updatedResponse.data.user });
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUser(initialUser); // Revert to initial state
    setPreviewImage(null); // Clear preview if no file was uploaded
  };

  const homePage = () => {
    navigate('/');
  };
  const handleLogout = async () => {
    try {
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(5px)', // Blur only the background
          zIndex: 0,
        }}
      />
      <div className="relative min-h-screen flex items-center justify-center z-10">
        <div
          className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white
            backdropFilter: 'blur(5px)', // Subtle glass effect
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Profile</h1>
          <div className="flex flex-col items-center mb-6">
            <img
              src={user?.profile_image ? `http://localhost:8000/storage/${user.profile_image}` : 'default-avatar.png'}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
              />
            )}
          </div>
          <div className="space-y-6">
            <div className="flex flex-row space-x-6">
              {/* Personal Information Section */}
              <div className="w-1/2">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Personal Information</h2>
                <div className="space-y-4">
                  {Object.entries({
                    Name: 'name',
                    Email: 'email',
                    'Phone Number': 'contact_number',
                    Age: 'age',
                    Gender: 'gender',
                  }).map(([label, field]) => (
                    <div key={field} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">{label}</label>
                      {isEditing ? (
                        <input
                          type={field === 'email' ? 'email' : field === 'age' ? 'number' : 'text'}
                          name={field}
                          value={user[field] || ''}
                          onChange={handleInputChange}
                          className="mt-1 w-full h-10 p-2 border rounded-md bg-white text-black"
                          min={field === 'age' ? '1' : undefined}
                        />
                      ) : (
                        <p className="mt-1 w-full h-10 p-2 bg-gray-50 rounded-md text-gray-800 flex items-center">{user[field] || 'N/A'}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              {/* Location Information Section */}
              <div className="w-1/2">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Location Information</h2>
                <div className="space-y-4">
                  {Object.entries({
                    Address: 'address',
                    City: 'city',
                    State: 'state',
                    Pincode: 'pincode',
                  }).map(([label, field]) => (
                    <div key={field} className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700">{label}</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name={field}
                          value={user[field] || ''}
                          onChange={handleInputChange}
                          className="mt-1 w-full h-10 p-2 border rounded-md bg-white text-black"
                        />
                      ) : (
                        <p className="mt-1 w-full h-10 p-2 bg-gray-50 rounded-md text-gray-800 flex items-center">{user[field] || 'N/A'}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              {isEditing ? (
                <div className="flex space-x-4">
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Edit Profile
                </button>

              )}
              <button
                onClick={homePage}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Back To Home
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;