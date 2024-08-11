import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpiPage = () => {
  const [copyButtonText, setCopyButtonText] = useState('Copy');
  const [popupVisible, setPopupVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    User_id: '',
    name: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userData = localStorage.getItem('user');
        if (userData) {
          const response = JSON.parse(userData);
          setUser(response);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleCopyClick = () => {
    const textToCopy = document.getElementById('upi-id').textContent;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => {
        setCopyButtonText('Copy');
      }, 2500);
    });
  };

  const handleProceedClick = () => {
    setPopupVisible(true);
  };

  const handlePopupClose = () => {
    setPopupVisible(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitClick = async () => {
    if (!file) {
      alert('Please select a screenshot of the payment!');
      return;
    }

    const formData = new FormData();
    formData.append('User_id', user.User_id);
    formData.append('name', user.name);
    formData.append('screenshot', file);

    try {
      const res = await axios.post('https://matrimony-jdzy.onrender.com/uploadPaymentImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Image uploaded successfully');
      setPopupVisible(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-6">
      <div className="fixed top-0 left-0 w-full bg-yellow-400 shadow-md z-50">
        <div className="flex justify-around py-4 max-w-3xl mx-auto">
          <button className="text-white font-bold px-4 py-2 rounded hover:bg-white hover:text-black" onClick={() => navigate('/Main')}>
            Home
          </button>
          <Link to="../search" className="text-white font-bold px-4 py-2 rounded hover:bg-white hover:text-black">
            Search
          </Link>
          <Link to="../contact" className="text-white font-bold px-4 py-2 rounded hover:bg-white hover:text-black">
            Contact
          </Link>
          <a href="help.html" className="text-white font-bold px-4 py-2 rounded hover:bg-white hover:text-black">
            Help
          </a>
        </div>
      </div>

      <div className="mt-20 bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <div className="mb-4">
          <img
            src="https://media.istockphoto.com/id/1347277582/vector/qr-code-sample-for-smartphone-scanning-on-white-background.jpg?s=612x612&w=0&k=20&c=6e6Xqb1Wne79bJsWpyyNuWfkrUgNhXR4_UYj3i_poc0="
            alt="UPI QR Code"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <p className="mb-2">Scan the QR code or use the UPI ID:</p>
        <div className="flex flex-col items-center">
          <strong id="upi-id" className="text-blue-600 mb-2">upi@id</strong>
          <button
            id="copy-button"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleCopyClick}
          >
            {copyButtonText}
          </button>
        </div>
        <button
          id="proceed-button"
          className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          onClick={handleProceedClick}
        >
          Proceed
        </button>
      </div>

      {popupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-4">Payment Confirmation</h2>
            <input
              type="file"
              id="payment-screenshot"
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4"
            />
            <input placeholder='Enter transaction ID' type='text' required className="mb-4"></input>
            <p className="mb-4">
              You have successfully completed your payment process and it will take 2 to 3 days to
              validate..kindly cooperate!!!
            </p>
            <button
              id="submit-button"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              onClick={handleSubmitClick}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpiPage;
