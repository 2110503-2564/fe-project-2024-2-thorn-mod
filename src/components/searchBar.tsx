"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Transition } from "@headlessui/react";

const restaurantRoutes: { [key: string]: string } = {
  "chill & cheese pizza bar": "/restaurant/67bdc7c052c428af8d90acc5",
  "the funky burger": "/restaurant/67bdc78f52c428af8d90acc2",
  "hipster hotpot": "/restaurant/67bdc81052c428af8d90acc8",
  "jazz noodle house": "/restaurant/67bdc84952c428af8d90accb",
  "pizza chill out": "/restaurant/67bdca9052c428af8d90acd0",
};
const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([
    "about",
    "contact",
    "services",
    "reservation",
    "restaurant",
    "chill & cheese pizza bar",
    "the funky burger",
    "pizza chill out",
    "jazz noodle house",
    "hipster hotpot",
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
    setIsOpen(e.target.value.length > 0);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (query && isClient) {
      if (restaurantRoutes[query.toLowerCase()]) {
        router.push(restaurantRoutes[query.toLowerCase()]);
      } else {
        router.push(`/${query}`);
      }
    }
  };

  return (
    <div className="w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSearch} className="relative">
        <div className="flex items-center bg-white rounded-full shadow-lg px-6 py-3 w-full">
          <input
            type="text"
            className="w-full text-lg border-none focus:outline-none placeholder-gray-500"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
          />
          <button type="submit" className="ml-3 text-blue-500">
            🔍
          </button>
        </div>
      </form>

      {/* Suggestion Dropdown */}
      <Transition
        show={isOpen}
        as="div"
        enter="transition ease-in duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-out duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="absolute left-0 right-0 w-full mt-2 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-10"
      >
        <ul className="space-y-2 p-2">
          {suggestions
            .filter((item) => item.toLowerCase().includes(query.toLowerCase()))
            .map((suggestion, index) => (
              <li
                key={index}
                className="cursor-pointer hover:bg-blue-500 hover:text-white rounded-md py-1 px-3"
                onClick={() => {
                  setQuery(suggestion);
                  if (isClient) {
                    const route = restaurantRoutes[suggestion.toLowerCase()]; // Fix here
                    if (route) {
                      router.push(route);
                    } else {
                      router.push(`/${suggestion}`);
                    }
                  }
                }}
              >
                {suggestion}
              </li>
            ))}
        </ul>
      </Transition>
    </div>
  );
};

export default SearchBar;
