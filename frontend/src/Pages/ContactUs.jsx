import React from 'react';
import Head from './Head';

const ContactUs = () => {
  return (
    <div className="font-sans bg-[#F5CCA0]">
      <Head />
      <div className="text-center">
        <p className="text-2xl font-bold text-[#7d3404] my-16">SIDHA VIDHAI TRUST</p>
      </div>
      <div className="flex justify-center">
        <div className="bg-[#E48F45] w-20 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto p-8 rounded-lg shadow-lg">
          <h1 className="text-center text-2xl font-bold mb-8">Contact Us</h1>
          <p className="text-left my-8">1. பிரம்மஶ்ரீ. கோthண்டவேலு அய்யா, பொதுச் செயலாளர் - 9884724712</p>
          <p className="text-left my-8">2. பிரம்மஶ்ரீ. ஜெகதீசன், உப தலைவர் - 9840347179</p>
          <p className="text-left my-8">3. பிரம்மஶ்ரீ. இரவிச்சந்திரன், விழாக்குழு தலைவர் - 9840892408</p>
        </div>
      </div>
      <footer className="bg-[#994D1C] text-white py-5 text-center mt-32">
        <div className="flex flex-wrap justify-around">
          <div className="flex-1 m-2">
            <p>பிரம்மஶ்ரீ. கோthண்டவேலு அய்யா</p>
            <p>பொதுச் செயலாளர்</p>
            <p>9884724712</p>
          </div>
          <div className="flex-1 m-2">
            <p>பிரம்மஶ்ரீ. ஜெகதீசன்</p>
            <p>உப தலைவர்</p>
            <p>9840347179</p>
          </div>
          <div className="flex-1 m-2">
            <p>பிரம்மஶ்ரீ. இரவிச்சந்திரன்</p>
            <p>விழாக்குழு தலைவர்</p>
            <p>9840892408</p>
          </div>
        </div>
        <p className="text-sm mt-2">&copy; 2024 Chennai Siddhavidhai Trust. All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default ContactUs;