import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import demoPlayers from "../../components/api/demo/players.json";
import { useQubicConnect } from "../../contexts/QubicConnectContext";
import { useHM25 } from "../../contexts/HM25Context";
import InputNumbers from "../../components/qubic/ui/InputNumbers";
import ConfirmTxModal from "../../components/qubic/connect/ConfirmTxModal";

import "./PlayerPage.css";

// Investment Modal Component
const InvestModal = ({ isOpen, onClose, player, onInvest }) => {
  const { connected, toggleConnectModal } = useQubicConnect();
  const { echo, balance } = useHM25();
  const amountRef = useRef();
  const [amount, setAmount] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!isOpen) return null;

  const handleValidate = () => amountRef.current.validate();
  
  const handleSubmit = async () => {
    if (!handleValidate()) return;
    setShowConfirmModal(true);
  };
  
  const confirmInvestment = async () => {
    await echo(amount);
    // Here you would also add player investment logic
  };
  
  const handleTransactionComplete = () => {
    setShowConfirmModal(false);
    onClose();
    onInvest();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-white font-bold">Invest in {player?.name}</h2>
          <button onClick={onClose} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        {!connected ? (
          <div className="text-center text-white mb-4">
            Please connect your wallet to invest.
            <button
              onClick={toggleConnectModal}
              className="bg-primary-40 text-black px-4 py-2 rounded ml-2 mt-2 block w-full"
            >
              Unlock Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-700 p-3 rounded mb-4">
              <p className="text-white text-sm">Token Price: ${player?.tokenPrice}</p>
              <p className="text-white text-sm">Funding Progress: {player?.fundingProgress}%</p>
              <p className="text-white text-sm">Balance: {balance || 0} QUBIC</p>
            </div>
            
            <InputNumbers
              id="investAmount"
              ref={amountRef}
              labelComponent={<span className="text-white">Amount to Invest (QUBIC)</span>}
              minLimit={1}
              onChange={setAmount}
              placeholder="0"
            />
            
            <button
              className="bg-primary-40 text-black w-full p-3 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={balance <= 0 || Number(amount) > Number(balance)}
              title={balance <= 0 ? 'Insufficient balance.' : Number(amount) > Number(balance) ? 'Amount exceeds balance.' : ''}
            >
              Invest
            </button>
          </div>
        )}
        
        <ConfirmTxModal
          open={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          tx={{ title: `Invest in ${player?.name}`, amount }}
          onConfirm={confirmInvestment}
          onTransactionComplete={handleTransactionComplete}
        />
      </div>
    </div>
  );
};

const PlayerPage = () => {
  const navigate = useNavigate();
  // State to track which dropdown is open
  const [openDropdownId, setOpenDropdownId] = useState(null);
  // State for investment modal
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  // Queries
  const query = useQuery({
    queryKey: ["players"],
    queryFn: () =>
      fetch("http://194.164.234.59:3000/player").then((res) => res.json()),
  });

  // Use the data from the query, or fall back to the demo players if data isn't loaded yet
  const players = query.data ?? demoPlayers;

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

  // Handle navigation to player detail or open invest modal
  const handlePlayerAction = (action, playerId) => {
    if (action === "detail") {
      navigate(`/player/${playerId}`);
    } else if (action === "invest") {
      const player = players.find(p => p._id === playerId);
      setSelectedPlayer(player);
      setIsInvestModalOpen(true);
    }
    setOpenDropdownId(null);
  };

  // Handle successful investment
  const handleInvestmentComplete = () => {
    // Refetch players data or update UI as needed
    query.refetch();
  };

  // Dropdown menu options
  const dropdownOptions = [
    { id: "detail", label: "Detail", type: "regular" },
    { id: "invest", label: "Invest", type: "regular" }
    // { id: "delete", label: "Delete", type: "danger" },
  ];
  
  // Table headers array
  const tableHeaders = [
    { id: 'image', label: 'Player' },
    { id: 'name', label: 'Name' },
    { id: 'position', label: 'Position' },
    { id: 'currentClub', label: 'Current Club' },
    { id: 'targetClub', label: 'Target Club' },
    { id: 'clubLogo', label: 'Club Logo' },
    { id: 'contractValue', label: 'Contract Value' },
    { id: 'tokenPrice', label: 'Token Price' },
    { id: 'fundingProgress', label: 'Funding Progress' },
    { id: 'actions', label: <span className="sr-only">Actions</span> }
  ];

  return (
    <div
      className="w-full mx-auto mt-[90px] text-white"
      onClick={handleClickOutside}
    >
      {/* Investment Modal */}
      <InvestModal 
        isOpen={isInvestModalOpen}
        onClose={() => setIsInvestModalOpen(false)}
        player={selectedPlayer}
        onInvest={handleInvestmentComplete}
      />
      
      <section className="teams-container dark:bg-white-900 p-3 sm:p-5">
        <div className="mx-auto w-full px-4 lg:px-12">
          {/* <!-- Start coding here --> */}
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-3/4">
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
              <div className="md:w-1/4 flex items-center justify-end">
                <button 
                  className="bg-blue-600 -full text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => navigate('/player-funding')}
                >
                  Fundings Monitor
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-neutral-100 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header.id} scope="col" className="px-4 py-3">
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {players.map((player) => (
                    <tr
                      key={player._id}
                      className="border-b dark:border-gray-700"
                    >
                      <td className="px-4 py-3">
                        {player.image ? (
                          <img
                            src={player.image}
                            alt={`${player.name}`}
                            className="h-16 w-16 object-contain rounded-full"
                          />
                        ) : (
                          "No image"
                        )}
                      </td>
                      <th
                        scope="row"
                        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {player.name}
                      </th>
                      <td className="px-4 py-3">{player.position}</td>
                      <td className="px-4 py-3">{player.currentClub}</td>
                      <td className="px-4 py-3">
                        {player.targetClub?.name || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        {player.targetClub?.logo ? (
                          <img
                            src={player.targetClub.logo}
                            alt={`${player.targetClub.name} logo`}
                            className="h-10 w-10 object-contain"
                          />
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        ${player.contractValue.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">${player.tokenPrice}</td>
                      <td className="px-4 py-3">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${player.fundingProgress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-700 dark:text-gray-300 mt-1">
                          {player.fundingProgress}%
                        </span>
                      </td>
                      <td className="px-4 py-3 flex items-center justify-end">
                        <button
                          id={`${player._id}-dropdown-button`}
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering handleClickOutside
                            toggleDropdown(player._id);
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
                          id={`${player._id}-dropdown`}
                          className={`${
                            openDropdownId === player._id ? "block" : "hidden"
                          } absolute mt-12 mr-12 right-0 z-10 w-56 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-600`}
                          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dropdown
                        >
                          <ul
                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                            aria-labelledby={`${player._id}-dropdown-button`}
                          >
                            {dropdownOptions
                              .filter((option) => option.type === "regular")
                              .map((option) => (
                                <li key={option.id}>
                                  <a
                                    href="#"
                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handlePlayerAction(option.id.toLowerCase(), player._id);
                                    }}
                                  >
                                    {option.label}
                                  </a>
                                </li>
                              ))}
                          </ul>
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
