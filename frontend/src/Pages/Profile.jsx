import React, { useState, useEffect } from 'react';
import axios from 'axios';
const UserProfile = () => {
  const [user, setUser] = useState({
    User_id: '',
    name: '',
    email: '',
    mother_tongue: '',
    marital_status: '',
    dob: '',
    gender: '',
    highest_degree: '',
    employed_in: '',
    annual_income: '',
    express_yourself: '',
    family_type: '',
    father_occupation: '',
    mother_occupation: '',
    brother: '',
    sister: '',
    family_living_location: '',
    contact_address: '',
    about_family: '',
    status: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeState, setActiveState] = useState('ProfileDetails');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = JSON.parse(localStorage.getItem('user'));
        setUser(response);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

 
  const handleSaveProfileDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://matrimony-jdzy.onrender.com/updateProfileDetails', {
        User_id: user.User_id,
        name: user.name,
        dob: user.dob,
        marital_status: user.marital_status,
        mother_tongue: user.mother_tongue,
        gender: user.gender
      });
      setIsEditing(false);
      setUser(res.data.updatedDetails);
      localStorage.setItem('user',JSON.stringify(res.data.updatedDetails))
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile...');
    }
  };

  const handleSaveCareerDetails = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://matrimony-jdzy.onrender.com/updateCareerDetails', {
        User_id: user.User_id,
        highest_degree: user.highest_degree,
        employed_in: user.employed_in,
        annual_income: user.annual_income,
        express_yourself: user.express_yourself,
      });
      setIsEditing(false);
      setUser(res.data.updatedDetails)
      localStorage.setItem('user',JSON.stringify(res.data.updatedDetails))
      alert('Career details updated successfully');
    } catch (error) {
      console.error('Error updating career details:', error);
      alert('Error updating career details');
    }
  };

  const handleSaveLifestyleFamily = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://matrimony-jdzy.onrender.com/updateFamilyDetails', {
        User_id: user.User_id,
        family_type: user.family_type,
        father_occupation: user.father_occupation,
        mother_occupation: user.mother_occupation,
        brother: user.brother,
        sister: user.sister,
        family_living_location: user.family_living_location,
        contact_address: user.contact_address,
        about_family: user.about_family,
      });
      setIsEditing(false);
      setUser(res.data.updatedDetails)
      localStorage.setItem('user',JSON.stringify(res.data.updatedDetails))
      alert('Lifestyle and family details updated successfully');
    } catch (error) {
      console.error('Error updating lifestyle and family details:', error);
      alert('Error updating lifestyle and family details');
    }
  };

  
  const profileSections = {
    ProfileDetails: (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mother_tongue" className="block text-sm font-medium text-gray-700">Mother Tongue</label>
            <input
              type="text"
              id="mother_tongue"
              name="mother_tongue"
              value={user.mother_tongue}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700">Marital Status</label>
            <select
              id="marital_status"
              name="marital_status"
              value={user.marital_status}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            >
            <option value='Single'>Single</option>
            <option value='Divorced'>Divorced</option>
            <option value='Married'>Married</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="text"
              id="dob"
              name="dob"
              value={user.dob}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              id="gender"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            {isEditing ? (
              <button
                type="button"
                onClick={(e)=>{handleSaveProfileDetails(e)}}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-700 focus:ring focus:ring-amber-300"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-700 focus:ring focus:ring-amber-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    ),
    CareerDetails: (
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="highest_degree" className="block text-sm font-medium text-gray-700">Highest Degree</label>
            <input
              type="text"
              id="highest_degree"
              name="highest_degree"
              value={user.highest_degree}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="employed_in" className="block text-sm font-medium text-gray-700">Employed In</label>
            <input
              type="text"
              id="employed_in"
              name="employed_in"
              value={user.employed_in}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="annual_income" className="block text-sm font-medium text-gray-700">Annual Income</label>
            <input
              type="number"
              id="annual_income"
              name="annual_income"
              value={user.annual_income}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="express_yourself" className="block text-sm font-medium text-gray-700">Express Yourself</label>
            <textarea
              id="express_yourself"
              name="express_yourself"
              value={user.express_yourself}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="flex justify-end">
            {isEditing ? (
              <button
                type="button"
                onClick={(e)=>{handleSaveCareerDetails(e)}}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-700 focus:ring focus:ring-amber-300"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-700 focus:ring focus:ring-amber-300"
              >
                Edit Career Details
              </button>
            )}
          </div>
        </form>
      </div>
    ),
    LifestyleFamily: (
      <div>
        <form >
          <div className="form-group">
            <label htmlFor="family_type" className="block text-sm font-medium text-gray-700">Family Type</label>
            <input
              type="text"
              id="family_type"
              name="family_type"
              value={user.family_type}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="father_occupation" className="block text-sm font-medium text-gray-700">Father's Occupation</label>
            <input
              type="text"
              id="father_occupation"
              name="father_occupation"
              value={user.father_occupation}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="mother_occupation" className="block text-sm font-medium text-gray-700">Mother's Occupation</label>
            <input
              type="text"
              id="mother_occupation"
              name="mother_occupation"
              value={user.mother_occupation}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="brother" className="block text-sm font-medium text-gray-700">Number of Brothers</label>
            <input
              type="number"
              id="brother"
              name="brother"
              value={user.brother}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sister" className="block text-sm font-medium text-gray-700">Number of Sisters</label>
            <input
              type="number"
              id="sister"
              name="sister"
              value={user.sister}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="family_living_location" className="block text-sm font-medium text-gray-700">Family Living Location</label>
            <input
              type="text"
              id="family_living_location"
              name="family_living_location"
              value={user.family_living_location}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact_address" className="block text-sm font-medium text-gray-700">Contact Address</label>
            <input
              type="text"
              id="contact_address"
              name="contact_address"
              value={user.contact_address}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="form-group">
            <label htmlFor="about_family" className="block text-sm font-medium text-gray-700">About Family</label>
            <textarea
              id="about_family"
              name="about_family"
              value={user.about_family}
              onChange={handleChange}
              disabled={!isEditing}
              required
              className="mt-2 block w-full border border-gray-300 rounded-lg p-3 text-gray-800 shadow-sm focus:ring focus:ring-amber-300"
            />
          </div>
          <div className="flex justify-end">
            {isEditing ? (
              <button
                type="button"
                onClick={(e)=>{handleSaveLifestyleFamily(e)}}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-700 focus:ring focus:ring-amber-300"
              >
                Save Changes
              </button>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="bg-amber-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-amber-700 focus:ring focus:ring-amber-300"
              >
                Edit Lifestyle & Family
              </button>
            )}
          </div>
        </form>
      </div>
    ),
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveState('ProfileDetails')}
          className={`px-4 py-2 rounded-lg shadow-md ${
            activeState === 'ProfileDetails'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          Profile Details
        </button>
        <button
          onClick={() => setActiveState('CareerDetails')}
          className={`px-4 py-2 rounded-lg shadow-md ${
            activeState === 'CareerDetails'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          Career Details
        </button>
        <button
          onClick={() => setActiveState('LifestyleFamily')}
          className={`px-4 py-2 rounded-lg shadow-md ${
            activeState === 'LifestyleFamily'
              ? 'bg-amber-600 text-white'
              : 'bg-gray-300 text-gray-800'
          }`}
        >
          Lifestyle & Family
        </button>
      </div>
      <div className="mt-4 max-h-screen overflow-y-auto">
        {profileSections[activeState]}
      </div>
    </div>
  );
};
export default UserProfile;