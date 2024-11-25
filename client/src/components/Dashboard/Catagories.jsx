import React from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts';

function Categories() {
   // Data for the Pie Chart
   const data = [
      { name: 'Personal', value: 26, color: '#ff6b6b' },
      { name: 'Shopping', value: 30, color: '#845ec2' },
      { name: 'Eating Out', value: 35, color: '#ff9612' },
      { name: 'Holidays', value: 10, color: '#00c9a7' },
   ];

   // Transaction Details
   const transactions = [
      { label: 'Personal', value: '-500 $', count: '14 transactions', color: '#ff6b6b' },
      { label: 'Shopping', value: '-410 $', count: '10 transactions', color: '#845ec2' },
      { label: 'Eating Out', value: '-325 $', count: '7 transactions', color: '#ff9612' },
      { label: 'Holidays', value: '-100 $', count: '2 transactions', color: '#00c9a7' },
   ];

   return (
      <div className="bg-[#1a1a2e] text-white p-6 rounded-lg shadow-md w-96">
         {/* Title */}
         <h2 className="text-xl font-semibold mb-6">Categories</h2>

         {/* Donut Chart */}
         <div className="flex justify-center mb-6">
            <PieChart width={200} height={200}>
               <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={5}>
                  {data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
               </Pie>
            </PieChart>
         </div>

         {/* Transaction List */}
         <div className="space-y-4">
            {transactions.map((transaction, index) => (
               <div key={index} className="flex justify-between items-center">
                  {/* Label */}
                  <div className="flex items-center">
                     <div className="w-4 h-4 rounded-full mr-3" style={{ backgroundColor: transaction.color }}></div>
                     <div>
                        <p className="text-sm font-medium">{transaction.label}</p>
                        <p className="text-xs text-gray-400">{transaction.count}</p>
                     </div>
                  </div>
                  {/* Value */}
                  <p className="text-red-500 font-bold">{transaction.value}</p>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Categories;
