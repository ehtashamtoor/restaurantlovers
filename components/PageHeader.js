import React from "react";

const PageHeader = ({ heading }) => {
  return (
    <div className="font-bold text-blue-500 capitalize">
      <h1 className="md:text-4xl text-md">{heading}</h1>
    </div>
  );
};

export default PageHeader;
