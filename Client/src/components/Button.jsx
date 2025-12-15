import React from "react";

function Button() {
  return (
    <div className="flex justify-center">
      <button
        type="submit"
        className="w-full px-4 py-2 mb-4 text-white font-bold rounded-md bg-blue-500 hover:bg-blue-500/90 shadow-lg shadow-blue-200 transition"
      >
        Login
      </button>
    </div>
  );
}

export default Button;
