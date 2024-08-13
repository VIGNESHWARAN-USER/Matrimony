import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LabelList
} from 'recharts';
import Requests from './Requests';

const AdminPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('AdminDashboard');
  const [details, setDetails] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://matrimony-jdzy.onrender.com/getDetails')
      .then(response => {
        setDetails(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching details:', error);
      });
  }, []);

  const getCounts = () => {
    const registeredUsers = details.length;
    const premiumUsers = details.filter(user => user.status === 'active').length;
    const nonPremiumUsers = details.filter(user => user.status === 'inactive').length;
    const waitlistUsers = details.filter(user=> user.status === 'waiting').length;

    return [
      { name: 'Registered Users', count: registeredUsers },
      { name: 'Premium Users', count: premiumUsers },
      { name: 'Waitlist Users', count: waitlistUsers},
      { name: 'Non-Premium Users', count: nonPremiumUsers },
    ];
  };

  const getGenderCounts = () => {
    const maleCount = details.filter(user => user.gender === 'Male').length;
    const femaleCount = details.filter(user => user.gender === 'Female').length;

    return [
      { name: 'Male', count: maleCount },
      { name: 'Female', count: femaleCount },
    ];
  };

  function handleLogout() {
    localStorage.setItem('user', '');
    navigate('../login');
  }

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDetails = details.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTable = (filteredDetails) => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
          <th className="py-2 px-4 border-b">User ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Gender</th>
          </tr>
        </thead>
        <tbody>
          {filteredDetails.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border">{user.User_id}</td>
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.email}</td>
              <td className="py-2 px-4 border">{user.status}</td>
              <td className="py-2 px-4 border">{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const sections = {
    AdminDashboard: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <ResponsiveContainer width="120%" height={400}>
          <BarChart data={getCounts()}>
            <XAxis dataKey="name" />
            <YAxis />
            <Legend />
            <Bar dataKey="count" fill="#8884d8">
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={getGenderCounts()}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              <Cell key="Male" fill="#0088FE" />
              <Cell key="Female" fill="#FF8042" />
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    ),
    RegisteredUsers: renderTable(filteredDetails),
    PremiumUsers: renderTable(filteredDetails.filter(user => user.status === 'active')),
    NonPremiumUsers: renderTable(filteredDetails.filter(user => user.status === 'inactive')),
    Requests: (
      <div>
        <Requests user={details}/>
      </div>
    )
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="bg-gray-800 text-white w-full md:w-1/4 h-full p-4">
        <h2 className="text-4xl font-semibold mb-6">Matrimony Admin</h2>
        <ul className='flex flex-col'>
          <li className={`py-2 ${activeSection === 'AdminDashboard' ? 'p-2 font-semibold bg-gray-600 rounded-lg w-64' : ''}`}>
            <button onClick={() => setActiveSection('AdminDashboard')} className="w-full m-4 text-lg font-semibold text-left">Dashboard</button>
          </li>
          <li className={`py-2 ${activeSection === 'RegisteredUsers' ? 'p-2 font-semibold bg-gray-600 rounded-lg w-64' : ''}`}>
            <button onClick={() => setActiveSection('RegisteredUsers')} className="w-full m-4 text-lg font-semibold text-left">Registered Users</button>
          </li>
          <li className={`py-2 ${activeSection === 'PremiumUsers' ? 'p-2 font-semibold bg-gray-600 rounded-lg w-64' : ''}`}>
            <button onClick={() => setActiveSection('PremiumUsers')} className="w-full m-4 text-lg font-semibold text-left">Premium Users</button>
          </li>
          <li className={`py-2 ${activeSection === 'NonPremiumUsers' ? 'p-2 font-semibold bg-gray-600 rounded-lg w-64' : ''}`}>
            <button onClick={() => setActiveSection('NonPremiumUsers')} className="w-full m-4 text-lg font-semibold text-left">Non-Premium Users</button>
          </li>
          <li className={`py-2 ${activeSection === 'Requests' ? 'p-2 font-semibold bg-gray-600 rounded-lg w-64' : ''}`}>
            <button onClick={() => setActiveSection('Requests')} className="w-full m-4 text-lg font-semibold text-left">Requests</button>
          </li>
        </ul>
      </div>
      <div className="bg-gray-100 flex-1 p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{activeSection.replace(/([A-Z])/g, ' $1').trim()}</h2>
          <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
        </div>
        {activeSection !== 'AdminDashboard' && activeSection !== 'ViewDetails' && (
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="py-2 px-4 border rounded w-full md:w-1/3"
            />
          </div>
        )}
        {sections[activeSection]}
      </div>
    </div>
  );
};

export default AdminPage;
