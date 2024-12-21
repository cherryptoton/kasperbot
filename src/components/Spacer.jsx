import React from "react";

const Spacer = ({ children }) => {
  return (
    <div className="w-full relative max-w-[1300px] mx-auto px-4 md:px-6">
      {children}
    </div>
  );
};

export default Spacer;
