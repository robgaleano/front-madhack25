import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const PlayerDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch player data by ID
  const { data: player, isLoading, isError } = useQuery({
    queryKey: ['player', id],
    queryFn: () => 
      fetch(`http://194.164.234.59:3000/player/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Player not found');
          return res.json();
        })
  });

  if (isLoading) {
    return (
      <div className="w-full mx-auto mt-[90px] p-6 text-center">
        <div className="text-xl">Loading player details...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full mx-auto mt-[90px] p-6 text-center">
        <div className="text-xl text-red-500">Error loading player details</div>
        <button 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/player')}
        >
          Back to Players
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-[90px] p-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Player Details</h1>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate('/player')}
          >
            Back to Players
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              {player?.image ? (
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-auto object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">{player?.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border-b pb-2">
                  <span className="text-gray-500">Position:</span>
                  <span className="font-medium ml-2">{player?.position}</span>
                </div>
                
                <div className="border-b pb-2">
                  <span className="text-gray-500">Age:</span>
                  <span className="font-medium ml-2">{player?.age}</span>
                </div>
                
                <div className="border-b pb-2">
                  <span className="text-gray-500">Nationality:</span>
                  <span className="font-medium ml-2">{player?.nationality}</span>
                </div>
                
                <div className="border-b pb-2">
                  <span className="text-gray-500">Current Club:</span>
                  <span className="font-medium ml-2">{player?.currentClub}</span>
                </div>
                
                <div className="border-b pb-2">
                  <span className="text-gray-500">Target Club:</span>
                  <span className="font-medium ml-2">{player?.targetClub?.name || 'N/A'}</span>
                </div>
                
                <div className="border-b pb-2">
                  <span className="text-gray-500">Contract Value:</span>
                  <span className="font-medium ml-2">${player?.contractValue?.toLocaleString()}</span>
                </div>
                
                <div className="border-b pb-2">
                  <span className="text-gray-500">Token Price:</span>
                  <span className="font-medium ml-2">${player?.tokenPrice}</span>
                </div>
                
                <div className="border-b pb-2">
                  <span className="text-gray-500">Funding Deadline:</span>
                  <span className="font-medium ml-2">
                    {player?.fundingDeadline ? new Date(player.fundingDeadline).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
              </div>
              
              {/* Wrap both sections in a flex container for desktop */}
              <div className="mt-12 flex flex-col md:flex-row md:gap-6">
                {/* Transfer Target Section */}
                <div className="p-4 bg-neutral-50 rounded-lg border border-gray-200 md:w-1/2">
                  <h3 className="text-lg font-semibold text-center mb-4">Transfer Target</h3>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-white rounded-full p-2 shadow-sm flex items-center justify-center">
                        <span className="text-sm font-medium">{player?.currentClub}</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-600">Current Club</p>
                    </div>
                    
                    <div className="flex-1 flex justify-center items-center px-2">
                      <div className="w-full h-0.5 bg-blue-500 relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 absolute -top-2.5 right-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-white rounded-full p-1 shadow-sm flex items-center justify-center">
                        {player?.targetClub?.logo ? (
                          <img 
                            src={player.targetClub.logo} 
                            alt={player.targetClub.name} 
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <span className="text-sm font-medium">{player?.targetClub?.name || 'N/A'}</span>
                        )}
                      </div>
                      <p className="mt-2 text-xs text-gray-600">Target Club</p>
                    </div>
                  </div>
                </div>
                
                {/* Funding Progress Section */}
                <div className="mt-4 md:mt-0 p-4 bg-neutral-50 rounded-lg border border-gray-200 md:w-1/2 flex flex-col justify-center">
                  <h3 className="text-lg font-semibold mb-2">Funding Progress</h3>
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-4 rounded-full"
                      style={{ width: `${player?.fundingProgress || 0}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 text-sm">
                    <span>{player?.fundingProgress || 0}% Complete</span>
                    <span>{player?.soldTokens?.toLocaleString() || 0} / {player?.totalTokens?.toLocaleString() || 0} Tokens Sold</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetail;
