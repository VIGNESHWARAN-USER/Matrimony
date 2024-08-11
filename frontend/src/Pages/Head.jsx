import React from 'react';
import logo11 from "../Images/logo11.png";
import { Link } from 'react-router-dom';

const Head = () => {
  return (
    <div>
      <div className="flex items-center justify-between p-2.5 bg-[#F5CCA0] flex-wrap text-center">
        <img src={logo11} alt="Logo" className="rounded-full" style={{ width: '145px', height: 'auto' }}/>
        <h1 className="flex-grow my-2.5 text-bold text-[#994D1C] text-center text-3xl font-bold">Chennai Siddha Viddhai Abyasa Nilaya Trust</h1>
        <Link to="../signup" className="m-2.5 inline-block px-6 py-4 bg-[#994D1C] text-white no-underline rounded text-center relative overflow-hidden hover:bg-[#f6ae6f]">
          Visit Matrimony Site
          <span className="absolute top-0 left-[-50%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></span>
        </Link>
      </div>
      <div className="bg-[#994D1C]">
        <ul className="list-none m-0 p-0 text-center">
          <li className="inline-block relative">
            <Link to="../" className="block px-5 py-3 text-white no-underline hover:bg-[#d7a166]">Home</Link>
          </li>
          <li className="inline-block relative">
            <Link to="../administration" className="block px-7 py-3 text-white no-underline hover:bg-[#d7a166]">Administration</Link>
          </li>
          <li className="inline-block relative">
            <Link to="../celebration" className="block px-5 py-3 text-white no-underline hover:bg-[#d7a166]">Celebrations</Link>
          </li>
          <li className="inline-block relative">
            <Link to="../aboutswami" className="block px-5 py-3 text-white no-underline hover:bg-[#d7a166]">About swami</Link>
          </li>
          <li className="inline-block relative group">
          <li className="block">
                <Link to="../headoffice" className="block px-5 py-3 text-white no-underline hover:bg-[#d7a166]">Head Office</Link>
              </li>
          </li>
          <li className="inline-block relative">
            <Link to="../gallery" className="block px-5 py-3 text-white no-underline hover:bg-[#d7a166]">Gallery</Link>
          </li>
          <li className="inline-block relative">
            <Link to="../contact" className="block px-5 py-3 text-white no-underline hover:bg-[#d7a166]">Contact Us</Link>
          </li>
        </ul>
      </div>
      <style>
        {`@keyframes shimmer {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(50%); }
        }`}
      </style>
    </div>
  );
}

export default Head;