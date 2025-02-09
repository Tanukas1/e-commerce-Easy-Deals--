import React from "react";

function Button({ title = "Button", onClick, className = "" }) {
  return (
    <div className="flex">
      <button
        className={`w-full sm:w-auto px-4 py-3 bg-[#7E60BF] text-white font-semibold rounded-md transition duration-200 hover:bg-black ${className}`}
        type="button"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
}

export default Button;
