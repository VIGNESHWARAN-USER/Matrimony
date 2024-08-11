import React from 'react';
import imgPage1 from "../Images/INVITATION[1]_page-0001.jpg";
import imgPage2 from "../Images/INVITATION[1]_page-0002.jpg";
import imgPage3 from "../Images/INVITATION[1]_page-0003.jpg";
import imgPage4 from "../Images/INVITATION[1]_page-0004.jpg";
import imgPage5 from "../Images/INVITATION[1]_page-0005.jpg";
import imgPage6 from "../Images/INVITATION[1]_page-0006.jpg";
import imgPage7 from "../Images/INVITATION[1]_page-0007.jpg";
import imgPage8 from "../Images/INVITATION[1]_page-0008.jpg";
import Head from './Head';

const Celebration = () => {
  return (
    <div className="bg-[#F5CCA0] font-sans">
      <Head />
      <div className="celebrtn text-center">
        <center><p className="text-3xl font-bold text-[#7d3404] my-12">Celebration</p></center>
      </div>
      <center>
      <div className="invitation-images w-full max-w-[1000px] py-6 flex flex-col items-center mx-auto">
  <img src={imgPage1} alt="" className="w-full h-[1400px] object-cover my-2.5" />
  <img src={imgPage2} alt="" className="w-full h-[1400px] object-cover my-2.5" />
  <img src={imgPage3} alt="" className="w-full h-[1400px] object-cover my-2.5" />
  <img src={imgPage4} alt="" className="w-full h-[1400px] object-cover my-2.5" />
  <img src={imgPage5} alt="" className="w-full h-[1400px] object-cover my-2.5" />
  <img src={imgPage6} alt="" className="w-full h-[1400px] object-cover my-2.5" />
  <img src={imgPage7} alt="" className="w-full h-[1400px] object-cover my-2.5" />
  <img src={imgPage8} alt="" className="w-full h-[1400px] object-cover my-2.5" />
</div>

      </center>
      <footer className="footer bg-[#994D1C] text-white p-5 text-center mt-32">
        <div className="footer-content flex flex-wrap justify-around">
          <div className="flex-1 m-2">
            <p>பிரம்மஶ்ரீ. கோதண்டவேலு அய்யா</p>
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
        <p className="text-sm mt-5">&copy; 2024 Chennai Siddhavidhai Trust. All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Celebration;