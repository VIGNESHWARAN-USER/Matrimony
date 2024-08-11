import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";


function OTPComp() {
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", ""]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { email, otp } = location.state || {};
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  function resendOTP() {
    if (disable) return;
    axios
      .post('https://matrimony-jdzy.onrender.com/send_recovery_email', { OTP: otp, recipient_email: email })
      .then(() => {
        setDisable(true);
        console.log("sent");
        alert("A new OTP has successfully been sent to your email.");
        setTimer(60);
      })
      .catch(console.log);
  }

  function verifyOTP(e) {
    e.preventDefault();
    const enteredOTP = OTPinput.join("");
    if (enteredOTP === otp.toString()) {
      navigate('../reset', { state: { email: email} }); 
      return;
    }
    alert("The code you have entered is not correct, try again or re-send the link");
  }

  useEffect(() => {
    if (disable) {
      let interval = setInterval(() => {
        setTimer((lastTimerCount) => {
          if (lastTimerCount <= 1) {
            clearInterval(interval);
            setDisable(false);
            return 0;
          }
          return lastTimerCount - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [disable]);

  const handleInputChange = (index, value, event) => {
    if (isNaN(value)) return;
    const newOTPinput = [...OTPinput];
    newOTPinput[index] = value;
    setOTPinput(newOTPinput);

    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else if (value === "" && index > 0 && event.key === "Backspace") {
      inputRefs[index - 1].current.focus();
    }
  };

  return (
    <div className="flex w-full flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Email Verification</h2>
        <form className="space-y-6" onSubmit={verifyOTP}>
          <p className="text-blue-700 text-center">We have sent a code to your email</p>
          <div className="flex justify-center space-x-4 mb-6">
            {OTPinput.map((_, index) => (
              <input
                key={index}
                type="text"
                className="w-12 p-3 text-center text-xl border shadow-xl rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                maxLength="1"
                required
                ref={inputRefs[index]}
                value={OTPinput[index]}
                onChange={(e) => handleInputChange(index, e.target.value, e)}
                onKeyDown={(e) => handleInputChange(index, e.target.value, e)}
              />
            ))}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Verify Account
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-blue-700">Didn&apos;t receive the code?</p>
            <p
              className={`${disable ? "text-gray-500" : "text-blue-700 cursor-pointer underline"}`}
              onClick={resendOTP}
            >
              {disable ? `Resend OTP in ${timerCount}s` : "Resend OTP"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

OTPComp.propTypes = {
  email: PropTypes.string.isRequired,
  otp: PropTypes.number.isRequired,
};

export default OTPComp;
