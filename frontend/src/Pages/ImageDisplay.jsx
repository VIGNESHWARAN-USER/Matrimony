import React from 'react';

const ImageDisplay = ({ imagepath }) => {
  return (
    <div>
      {imagepath && (
        <img src={`../${imagepath}`} alt="Uploaded" className="w-32 h-32 rounded-full object-cover ml-[20px]"/>
      )}
    </div>
  );
};

export default ImageDisplay;
