import React from 'react';

function TrackFinance() {
   const data = [
      { label: 'Food and grocery', value: 872400, maxValue: 1500000 },
      { label: 'Shopping', value: 1378200, maxValue: 1500000 },
      { label: 'House Rent', value: 928500, maxValue: 1500000 },
      { label: 'Commute', value: 420700, maxValue: 1500000 },
    //   { label: 'EMI', value: 520000, maxValue: 1500000 },
   ];

   return (
      <div className="bg-[#1a1a2e] text-white p-6 rounded-lg shadow-md w-96">
         <h2 className="text-xl font-semibold mb-4">Track your Finance</h2>
         <div className="space-y-4">
            {data.map((item, index) => (
               <div key={index}>
                  {/* Label and Value */}
                  <div className="flex justify-between text-sm mb-1">
                     <span>{item.label}</span>
                     <span>{item.value.toLocaleString()}</span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-700 rounded-full h-2">
                     <div
                        className="bg-green-400 h-2 rounded-full"
                        style={{
                           width: `${(item.value / item.maxValue) * 100}%`,
                        }}
                     ></div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default TrackFinance;
