import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo11 from "../Images/logo11.png";
import user from "../Images/user.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="relative flex justify-between items-center px-4 py-2 shadow-md" style={{ backgroundColor: 'rgb(245, 193, 124)' }}>
            <div className="flex items-center w-full">
                <Link to="/" className="text-2xl font-bold flex items-center">
                    <img src={logo11} className="w-20 h-auto mr-2" alt="Logo" />
                </Link>
                <button
                    className="md:hidden ml-auto text-white focus:outline-none"
                    onClick={toggleMenu}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>

            <div className="hidden w-96 md:flex justify-center items-center space-x-10 mr-10">
                <Link to="/matrimony" className="text-white m-2 font-bold">Home</Link>
                <Link to="/search" className="text-white m-2 font-bold">Search</Link>
                <Link 
                    to="/payment" 
                    className="text-white font-bold px-3 py-2 m-2 rounded-md transition"
                >
                    Upgrade
                </Link>
                <Link to="/help" className="text-white m-2 font-bold">Help</Link>
                <Link to="/profile" className="text-white m-2 font-bold">Profile</Link>
            </div>

            {/* Mobile menu */}
            <div className={`${isOpen ? 'block' : 'hidden'} absolute top-20 left-0 w-full bg-white shadow-lg`}>
                <div className="flex flex-col items-center space-y-4 p-5">
                    <Link to="/home" className="text-gray-800 font-bold">Home</Link>
                    <Link to="/search" className="text-gray-800 font-bold">Search</Link>
                    <Link 
                        to="/upgrade" 
                        className="text-white font-bold px-4 py-2 rounded-md transition"
                    >
                        Upgrade
                    </Link>
                    <Link to="/help" className="text-gray-800 font-bold">Help</Link>
                    <Link to="/profile" className="text-gray-800 font-bold">Profile</Link>
                </div>
            </div>
        </nav>
    );
};

const Header = () => {
    return (
        <header className="bg-gray-200 text-center py-20 border-b border-gray-300">
            <div>
                <h3 className="text-2xl text-blue-900">Find Your Match</h3>
                <p className="text-gray-600 mt-2">Search for profiles that match your preferences</p>
            </div>
        </header>
    );
};

const ProfileCard = ({ profile, onClick }) => {
    return (
        <div
            className="flex items-center bg-white border border-gray-300 rounded-lg p-10 mb-12 cursor-pointer transition-shadow duration-300 shadow-md hover:shadow-lg max-w-full w-[800px]"
            onClick={onClick}
        >
            <div>
                <img src={user.image} alt="Profile" className="w-32 h-32 rounded-full object-cover ml-[20px]" />
            </div>
            <div className="ml-[70px]">
                <h5 className="text-xl font-bold text-blue-900">{profile.name}</h5>
                <p className="text-gray-600">{profile.status}</p>
                <p className="text-gray-600">{profile.details}</p>
                <p className="text-gray-600">{profile.location}</p>
                <p className="text-gray-600 mb-4">{profile.description}</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-blue-700">
                    View Profile
                </button>
            </div>
        </div>
    );
};

const Modal = ({ profile, isOpen, onClose }) => {
    if (!isOpen || !profile) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto relative">
                <button 
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <div className="flex flex-col items-center">
                    <img 
                        src={profile.image} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-xl font-bold mb-2">{profile.name}</h3>
                    <p className="text-gray-600 mb-2">Email: {profile.email}</p>
                    <p className="text-gray-600 mb-2">Contact: {profile.contact_address}</p>
                    <p className="text-gray-600 mb-2">DOB: {profile.dob}</p>
                    <p className="text-gray-600 mb-2">Annual Income: {profile.annual_income}</p>
                    <p className="text-gray-600 mb-2">Occupation: {profile.employed_in}</p>
                    <p className="text-gray-600 mb-2">About Family: {profile.about_family}</p>
                    {/* Add other fields as needed */}
                </div>
            </div>
        </div>
    );
};

const MatrimonySearch = () => {
    const [query, setQuery] = useState('');
    const [details, setDetails] = useState([]);
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userStatus, setUserStatus] = useState('inactive'); // Assume status is fetched from user profile
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/getDetails')
            .then(response => {
                setDetails(response.data);
                setFilteredProfiles(response.data);
                localStorage.setItem('profiles', JSON.stringify(response.data));
            })
            .catch(error => {
                console.error('Error fetching details:', error);
            });
        const user = JSON.parse(localStorage.getItem('user'));
        setUserStatus(user.status);
        console.log(user.status);
    }, []);

    const handleSearch = () => {
        setLoading(true);
        setError('');
        try {
            let searchResults = details.filter(profile =>
                profile.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProfiles(searchResults);
            setLoading(false);
        } catch (err) {
            setError('Error retrieving profiles');
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };


    const handleProfileClick = (profile) => {
        if (userStatus === 'active') {
            setSelectedProfile(profile);
            setIsModalOpen(true);
        } else {
            navigate('/payment');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProfile(null);
    };

    return (
        <div>
            <Navbar />
            <Header />
            <div className="container mx-auto p-8">
                <div className="flex justify-center mb-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for profiles..."
                        className="border p-2 w-1/2 rounded-l-lg"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-purple-600 text-white p-2 rounded-r-lg"
                    >
                        Search
                    </button>
                </div>
               
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {userStatus === 'inactive' && filteredProfiles.length > 3 && (
                    <div className="text-center text-red-500 mb-4">
                        <p>Upgrade your account to view more results.</p>
                    </div>
                )}
                <div className="flex flex-col items-center p-5">
                    {filteredProfiles.slice(0, userStatus === 'inactive' ? 3 : filteredProfiles.length).map((profile) => (
                        <ProfileCard 
                            key={profile.id} 
                            profile={profile} 
                            onClick={() => handleProfileClick(profile)}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Component */}
            <Modal 
                profile={selectedProfile} 
                isOpen={isModalOpen} 
                onClose={closeModal} 
            />
        </div>
    );
};

export default MatrimonySearch;
