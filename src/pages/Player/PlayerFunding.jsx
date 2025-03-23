import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import playersFundingData from '../../components/api/demo/players-funding.json';

const PlayerFunding = () => {
  const navigate = useNavigate();

  // We'll use this query when connecting to a real API
  const { data: playersFunding, isLoading, isError } = useQuery({
    queryKey: ['playersFunding'],
    queryFn: async () => {
      try {
        const response = await fetch('http://194.164.234.59:3000/funding');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data || data.length === 0) {
          console.log('API returned empty data, using fallback data');
          return playersFundingData;
        }
        return data;
      } catch (error) {
        console.error('Error fetching funding data:', error);
        console.log('Using fallback data');
        return playersFundingData;
      }
    },
    initialData: playersFundingData,
    staleTime: 60000, // 1 minute
  });

  // Calculate remaining days
  const calculateRemainingTime = (deadline) => {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="w-full mx-auto mt-[90px] p-6 text-center">
        <div className="text-xl">Loading funding data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full mx-auto mt-[90px] p-6 text-center">
        <div className="text-xl text-red-500">Error loading funding data</div>
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
    <div className="w-full mx-auto mt-[90px] p-6 flex-grow flex flex-col">
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col flex-grow">
        <div className="flex justify-between items-center p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-800">Player Funding Opportunities</h1>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate('/player')}
          >
            Back to Players
          </button>
        </div>
        
        <div className="p-6 flex-grow overflow-auto">
          <div className="grid grid-cols-1 gap-6 pr-2">
            {playersFunding.map((funding) => (
              <div key={funding._id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{funding.playerName}</h2>
                      <div className="flex items-center mt-1">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {funding.tokenSymbol}
                        </span>
                        <span className="text-gray-500 text-sm ml-2">
                          ${funding.tokenPrice} per token
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-800">
                        ${funding.fundingRaised.toLocaleString()} / ${funding.fundingGoal.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {funding.fundingProgress}% funded
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${funding.fundingProgress}%` }}
                    ></div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-neutral-50 p-3 rounded border border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-600">Contract Value</h3>
                      <p className="text-lg font-bold">${funding.contractValue.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-neutral-50 p-3 rounded border border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-600">Tokens Available</h3>
                      <p className="text-lg font-bold">{funding.remainingTokens.toLocaleString()} / {funding.totalTokens.toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-neutral-50 p-3 rounded border border-gray-100">
                      <h3 className="text-sm font-semibold text-gray-600">Time Remaining</h3>
                      <p className="text-lg font-bold">{calculateRemainingTime(funding.fundingDeadline)} days</p>
                      <p className="text-xs text-gray-500">Deadline: {formatDate(funding.fundingDeadline)}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Recent Investors</h3>
                    <div className="bg-neutral-50 rounded border border-gray-100">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investor</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tokens</th>
                            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {funding.recentInvestors.map((investor, index) => (
                            <tr key={index}>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{investor.userId.slice(0, 4)}...{investor.userId.slice(-4)}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">${investor.amount.toLocaleString()}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{investor.tokens.toLocaleString()}</td>
                              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{new Date(investor.timestamp).toLocaleTimeString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-sm font-semibold text-gray-600 mb-2">Funding Trend</h3>
                    <div className="h-32 bg-neutral-50 p-2 rounded border border-gray-100 flex items-end justify-between">
                      {funding.fundingTrend.map((point, index) => {
                        const percentage = (point.amount / funding.fundingGoal) * 100;
                        return (
                          <div key={index} className="flex flex-col items-center" style={{ width: `${100 / funding.fundingTrend.length}%` }}>
                            <div 
                              className="bg-blue-500 w-4/5 rounded-t" 
                              style={{ height: `${percentage}%` }}
                            ></div>
                            <span className="text-xs text-gray-500 mt-1">{new Date(point.date).getDate()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-6">
                    <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition">
                      Invest Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerFunding;
