import { useState } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Password() {
  const location = useLocation();
  const { email } = location.state || {};
  const [svg1, setSvg1] = useState(false);
  const [svg2, setSvg2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = (id, setState, state) => (e) => {
    e.preventDefault();
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
    setState(!state);
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const Email = email;
      const response = await axios.post("http://localhost:3000/reset-password", { newPassword, Email });
      if (response.data.success) {
        navigate("/login");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("Internal server error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.name === 'newPassword') {
        document.getElementById('pass2').focus();
      } else if (e.target.name === 'confirmPassword') {
        changePassword(e);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Reset Password</h2>
        <form onSubmit={changePassword} className="space-y-6">
          <div className="relative">
            <input
              id="pass1"
              className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="absolute right-3 top-3"
              onClick={togglePasswordVisibility("pass1", setSvg1, svg1)}
            >
              {svg1 ? <FaEyeSlash className="mt-2 text-gray-800" /> : <FaEye className="text-gray-800" />}
            </button>
          </div>
          <div className="relative">
            <input
              id="pass2"
              className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              className="absolute right-3 top-3"
              onClick={togglePasswordVisibility("pass2", setSvg2, svg2)}
            >
              {svg2 ? <FaEyeSlash className="mt-2 text-gray-800" /> : <FaEye className="text-gray-800" />}
            </button>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

Password.propTypes = {
  email: PropTypes.string.isRequired,
};

export default Password;