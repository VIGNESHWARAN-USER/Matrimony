import React from 'react';
import Head from './Head';

const HeadOffice = () => {
  return (
    <div className="font-sans m-0 p-0 bg-[#F5CCA0]">
      <Head />
      <center>
        <p className="font-bold text-2xl my-14">SIDHA VIDHAI TRUST</p>
      </center>
      <div className="mx-auto text-center text-lg">
        <p className="mb-4">Address: 475M+44G, Old Washermanpet, Chennai, Tamil Nadu 600001</p>
        <p className="mb-4">Email: sidhavidhai@gmail.com</p>
        <p className="mb-4">Landmark: DhakshinaMoorthy Swamy Jeeva Samadhi Mada</p>
      </div>
      <div className="flex justify-center my-8">
        <iframe
          width="600"
          height="450"
          frameBorder="0"
          className="border-0"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7771.7280103555!2d80.2828265!3d13.1078006!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f672ee16563%3A0xfc432e6f2c96fcae!2sDhakshinaMoorthy%20Swamy%20Jeeva%20Samadhi%20Mada!5e0!3m2!1sen!2sin!4v1718428749108!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <footer className="bg-[#994D1C] text-white p-5 text-center mt-32">
        <div className="flex flex-wrap justify-around">
          <div className="flex-1 mx-2 my-2">
            <p>பிரம்மஶ்ரீ. கோதண்டவேலு அய்யா</p>
            <p>பொதுச் செயலாளர்</p>
            <p>9884724712</p>
          </div>
          <div className="flex-1 mx-2 my-2">
            <p>பிரம்மஶ்ரீ. ஜெகதீசன்</p>
            <p>உப தலைவர்</p>
            <p>9840347179</p>
          </div>
          <div className="flex-1 mx-2 my-2">
            <p>பிரம்மஶ்ரீ. இரவிச்சந்திரன்</p>
            <p>விழாக்குழு தலைவர்</p>
            <p>9840892408</p>
          </div>
        </div>
        <p className="text-sm mt-2">&copy; 2024 Chennai Siddhavidhai Trust. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HeadOffice;