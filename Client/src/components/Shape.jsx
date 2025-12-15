import React from "react";

const Shape = ({ blob, blob2 }) => {
  return (
    <>
      <img
        src={blob}
        alt=""
        className="absolute top-80 -left-40 z-0 w-[400px] opacity-15 blur-md"
      />
      <img
        src={blob}
        alt=""
        className="absolute -top-40 left-20 z-0 w-[300px] opacity-15 blur-md"
      />
      <img
        src={blob2}
        alt=""
        className="absolute top-50 left-50 z-0 w-[250px] opacity-15 blur-md"
      />
    </>
  );
};

export default Shape;
