import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import "./PlayerPage.css";

const PlayerPage = () => {
  // State to track which dropdown is open
  const [openDropdownId, setOpenDropdownId] = useState(null);
  // Queries
  const query = useQuery({
    queryKey: ["players"],
    queryFn: () => fetch("http://10.19.200.185:3000/player").then((res) => res.json()),
  });

  console.log(query.data);

  // Toggle dropdown visibility
  const toggleDropdown = (productId) => {
    if (openDropdownId === productId) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(productId);
    }
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setOpenDropdownId(null);
  };

  // Products data array
  const products = [
    {
      id: "apple-imac-27",
      name: 'Apple iMac 27"',
      category: "PC",
      brand: "Apple",
      description: "300",
      price: "$2999",
    },
    {
      id: "apple-imac-20",
      name: 'Apple iMac 20"',
      category: "PC",
      brand: "Apple",
      description: "200",
      price: "$1499",
    },
    {
      id: "apple-iphone-14",
      name: "Apple iPhone 14",
      category: "Phone",
      brand: "Apple",
      description: "1237",
      price: "$999",
    },
    {
      id: "apple-ipad-air",
      name: "Apple iPad Air",
      category: "Tablet",
      brand: "Apple",
      description: "4578",
      price: "$1199",
    },
    {
      id: "xbox-series-s",
      name: "Xbox Series S",
      category: "Gaming/Console",
      brand: "Microsoft",
      description: "56",
      price: "$299",
    },
    {
      id: "playstation-5",
      name: "PlayStation 5",
      category: "Gaming/Console",
      brand: "Sony",
      description: "78",
      price: "$799",
    },
    {
      id: "xbox-series-x",
      name: "Xbox Series X",
      category: "Gaming/Console",
      brand: "Microsoft",
      description: "200",
      price: "$699",
    },
    {
      id: "apple-watch-se",
      name: "Apple Watch SE",
      category: "Watch",
      brand: "Apple",
      description: "657",
      price: "$399",
    },
    {
      id: "nikon-d850",
      name: "NIKON D850",
      category: "Photo",
      brand: "Nikon",
      description: "465",
      price: "$599",
    },
    {
      id: "benq-ex2710q",
      name: "Monitor BenQ EX2710Q",
      category: "TV/Monitor",
      brand: "BenQ",
      description: "354",
      price: "$499",
    },
  ];

  // Dropdown menu options
  const dropdownOptions = [
    { id: "show", label: "Show", type: "regular" },
    { id: "edit", label: "Edit", type: "regular" },
    { id: "delete", label: "Delete", type: "danger" },
  ];

  return (
    <div
      className="max-w-md mx-auto mt-[90px] text-white"
      onClick={handleClickOutside}
    >
      <section className="teams-container dark:bg-white-900 p-3 sm:p-5">
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full">
                <form className="flex items-center">
                  <label htmlFor="simple-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="simple-search"
                      className="bg-whitesmoke border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Search"
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-neutral-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Brand
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Description
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-4 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {product.name}
                      </th>
                      <td className="px-4 py-3">{product.category}</td>
                      <td className="px-4 py-3">{product.brand}</td>
                      <td className="px-4 py-3">{product.description}</td>
                      <td className="px-4 py-3">{product.price}</td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id={`${product.id}-dropdown-button`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering handleClickOutside
                            toggleDropdown(product.id);
                          }}
                          className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                          type="button"
                        >
                          <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                        <div
                          id={`${product.id}-dropdown`}
                          className={`${
                            openDropdownId === product.id ? "block" : "hidden"
                          } absolute mt-2 right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dropdown
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby={`${product.id}-dropdown-button`}
                          >
                            {dropdownOptions
                              .filter((option) => option.type === "regular")
                              .map((option) => (
                                <li key={option.id}>
                                  <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    {option.label}
                                  </a>
                                </li>
                              ))}
                          </ul>
                          <div className="py-1">
                            {dropdownOptions
                              .filter((option) => option.type === "danger")
                              .map((option) => (
                                <a
                                  key={option.id}
                                  href="#"
                                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                >
                                  {option.label}
                                </a>
                              ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlayerPage;
