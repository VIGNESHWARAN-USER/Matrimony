import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal'; // Import the Modal component

const Requests = ({ user }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [details, setDetails] = useState(user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleActivateAccount = (User_id) => {
    // API call to activate the user account
    axios.post(`https://matrimony-jdzy.onrender.com/activateUser/${User_id}`)
      .then(response => {
        alert('User account activated successfully');
        setDetails(details.map(user => user.id === userId ? { ...user, status: 'active' } : user));
        handleCloseModal(); // Close the modal after activating the account
      })
      .catch(error => {
        console.error('Error activating account:', error);
      });
  };

  const handleDeActivateAccount = (User_id) => {
    // API call to activate the user account
    axios.post(`https://matrimony-jdzy.onrender.com/deactivateUser/${User_id}`)
      .then(response => {
        alert('User account deactivated successfully');
        setDetails(details.map(user => user.id === userId ? { ...user, status: 'inactive' } : user));
        handleCloseModal(); // Close the modal after activating the account
      })
      .catch(error => {
        console.error('Error deactivating account:', error);
      });
  };
  

  const renderUserDetails = (user) => (
    
    <div>
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>
      <img 
      src={user.image} 
      alt="Profile" 
      className="w-32 h-32 rounded-full object-cover mb-4"
      />
      <p><b>User ID:</b>{user.User_id}</p>
      <img 
      src={user.screenshot} 
      alt="Profile" 
      className=" object-cover mb-4"
      />
      <p><b>Transaction ID:</b>{user.transaction_id}</p>
      <button
        onClick={handleCloseModal}
        className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'
      >
        Back to Users
      </button>
      <button
        onClick={() => handleDeActivateAccount(user.User_id)}
        className='mt-4 ml-2 bg-red-500 text-white py-2 px-4 rounded'
      >
        Deactivate Account
      </button>
      <button
        onClick={() => handleActivateAccount(user.User_id)}
        className='mt-4 ml-2 bg-green-500 text-white py-2 px-4 rounded'
      >
        Activate Account
      </button>
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Open</th>
          </tr>
        </thead>
        <tbody>
          {details.filter(user => user.status === 'waiting').map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.User_id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.gender}</td>
              <td className="py-2 flex justify-center px-4 border items-center">
                <button
                  onClick={() => handleOpenDetails(user)}
                  className='bg-green-700 text-white py-2 rounded-lg font-medium px-4'
                >
                  Open
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedUser && renderUserDetails(selectedUser)}
      </Modal>
    </div>
  );
};

export default Requests;
