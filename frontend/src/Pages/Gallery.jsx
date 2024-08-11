import React from 'react';
import gImg1 from "../Images/galleryimg15.jpg";
import gImg2 from "../Images/galleryimg13.jpg";
import gImg3 from "../Images/galleryimg14.jpg";
import gImg4 from "../Images/galleryimg16.jpg";
import gImg5 from "../Images/galleryimg17.jpg";
import gImg6 from "../Images/galleryimg18.jpg";
import gImg7 from "../Images/galleryimg1.jpg";
import gImg8 from "../Images/galleryimg2.jpg";
import gImg9 from "../Images/Galleryimg3.jpg";
import gImg10 from "../Images/Galleryimg4.jpg";
import gImg11 from "../Images/Galleryimg5.jpg";
import gImg12 from "../Images/Galleryimg6.jpg";
import gImg13 from "../Images/galleryimg7.jpg";
import gImg14 from "../Images/galleryimg8.jpg";
import gImg15 from "../Images/galleryimg9.jpg";
import gImg16 from "../Images/galleryimg10.jpg";
import gImg17 from "../Images/galleryimg11.jpg";
import gImg18 from "../Images/galleryimg20.jpg";
import gImg19 from "../Images/galleryimg21.jpg";
import gImg20 from "../Images/galleryimg22.jpg";
import gImg21 from "../Images/galleryimg23.jpg";
import gImg22 from "../Images/galleryimg24.jpg";
import gImg23 from "../Images/galleryimg25.jpg";
import gImg24 from "../Images/galleryimg26.jpg";
import Head from './Head';

const Gallery = () => {
  return (
    <div className="font-sans m-0 p-0 bg-[#F5CCA0]">
      <Head />
      <h1 className="text-center text-[#994D1C] my-8 text-3xl font-bold">Gallery</h1>
      <div className="gallery-images grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-5">
        <img src={gImg1} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg2} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg3} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg4} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg5} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg6} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg7} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg8} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg9} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg10} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg11} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg12} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg13} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg14} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg15} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg16} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg17} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg18} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg19} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg20} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg21} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg22} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg23} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
        <img src={gImg24} alt="image" className="gallery-img w-full h-48 object-cover transform transition duration-300 hover:scale-105" />
      </div>
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
        <p className="text-sm mt-2">&copy; 2024 Chennai Siddhavidhai Trust. All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Gallery;