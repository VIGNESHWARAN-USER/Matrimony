import { Route,Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Administration from "./Pages/Administration"
import Celebration from "./Pages/Celebration"
import AboutSwami from "./Pages/AboutSwami"
import HeadOffice from "./Pages/HeadOffice"
import Gallery from "./Pages/Gallery"
import ContactUs from "./Pages/ContactUs"
import SignUp from "./Pages/SignUp"
import Login from "./Pages/Login"
import Main from "./Pages/Main"
import Profile from "./Pages/Profile"
import AdminPage from "./Pages/AdminPage"
import UpiPage from "./Pages/Payment"
import MatrimonySearch from "./Pages/Search"
import OTPComp from "./Pages/OTP"
import Password from "./Pages/Password"
import Forgot from "./Pages/Forgot"

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/administration" element={<Administration/>}/>
        <Route path="/celebration" element={<Celebration/>}/>
        <Route path="/aboutswami" element={<AboutSwami/>}/>
        <Route path="/headoffice" element={<HeadOffice/>}/>
        <Route path="/gallery" element={<Gallery/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/matrimony" element={<Main/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path='/payment' element={<UpiPage/>}/>
        <Route path = '/search' element={<MatrimonySearch/>}/>
        <Route path = '/otp' element={<OTPComp/>}/>
        <Route path = '/reset' element={<Password/>}/>
        <Route path = '/forgot' element={<Forgot/>}/>
      </Routes>
    </div>
  )
}

export default App
