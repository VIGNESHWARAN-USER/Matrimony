import axios from 'axios';
import React, {  useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    form: ''
  });

  const [OTP, setOTP] = useState('')

  const navigate = useNavigate();

  const navigateToOtp = async () => {
    if (formData.email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTP(OTP);
      console.log("Generated OTP:", OTP);
      console.log(formData.email);
      try {
        const response = await axios.post('https://matrimony-jdzy.onrender.com/send_recovery_email', { OTP, recipient_email: formData.email });
        console.log(response.data.success);
        if (response.data.success) {
          console.log("Working");
          navigate('../otp', { state: { email: formData.email, otp: OTP } }); // Pass email and OTP
        } else {
          setErrors({ ...errors, form: error.response.data.msg });
        }
      } catch (error) {
        setErrors({ ...errors, form: 'An error occurred. Please try again.' });
      }
    } else {
      setErrors({ ...errors, form: 'Please enter your email address.' });
    }
  };
  

  const handleSub = (e) => {
    e.preventDefault();

    axios.post('https://matrimony-jdzy.onrender.com/login', formData)
      .then(response => {
        // Store user details in local storage
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        console.log(response.data);
        if (response.data.status === 'admin') {
          navigate('../admin');
        } else {
          navigate('../matrimony');
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.data) {
          setErrors({ ...errors, form: error.response.data.msg });
        } else {
          setErrors({ ...errors, form: 'An error occurred. Please try again.' });
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-300 via-amber-100 to-amber-300 bg-blend-overlay">
      <div className="bg-white rounded-lg w-11/12 max-w-md p-8 shadow-lg opacity-90">
        <h2 className="text-2xl text-amber-500 mb-6 text-center font-bold">Login</h2>
        <form onSubmit={handleSub} className="space-y-4">
          <div className="input-group">
            <input 
              type="text" 
              id="email" 
              name="email" 
              placeholder="Your Email Id" 
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border-none bg-gray-100 outline-none rounded-md"
              required 
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}
          </div>
          <div className="input-group">
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Create Password" 
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 border-none bg-gray-100 outline-none rounded-md"
              required 
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}
          </div>
          <button 
            type="submit" 
            className="w-full py-4 bg-amber-500 text-white font-bold rounded-md hover:bg-transparent hover:text-black border border-transparent hover:border-gray-400 transition duration-300"
          >
            Get Started
          </button>
          <p className="text-center text-black mt-4">
             Forget your password? <Link onClick={navigateToOtp} className="text-amber-500 hover:underline">Forget password</Link>
             </p>
             <p className="text-center text-black mt-4">
               Don&apos;t have an account? <Link to="../signup" className="text-amber-500 hover:underline">Sign Up</Link>
             </p>
        </form>
      </div>
    </div>
  );
};

export default Login;