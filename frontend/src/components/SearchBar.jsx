import React, { useState } from "react";

const SearchBar = ({ searchInput }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    searchInput(event.target.value);
    setInputValue(event.target.value); // Updates the state with the new value
  };
  return (
    <div>
      <div class="max-w-sm border-2 border-gray-200">
        {/* <!-- SearchBox --> */}
        <div class="relative">
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none z-20 ps-3.5">
              <svg
                class="shrink-0 size-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              class="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
              type="text"
              role="combobox"
              aria-expanded="false"
              placeholder="Project Name here"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {/* <!-- End SearchBox --> */}
      </div>
    </div>
  );
};

export default SearchBar;
