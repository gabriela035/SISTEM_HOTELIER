import React from 'react';

const BoxWrapper = ({ children }) => {
  return (

    // <div className="d-flex justify-content-center align-items-center mt-5 flex-wrap ">
    <div className="d-flex justify-content-center mt-3 flex-wrap" >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="mx-3 mt-5">
          {child}
        </div>
      ))}
    </div>

  );
};

export default BoxWrapper;
