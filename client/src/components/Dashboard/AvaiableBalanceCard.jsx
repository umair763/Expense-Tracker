function AvaiableBalanceCard() {
   return (
      <div className="bg-sky-200 shadow-lg rounded-xl p-4 flex flex-col w-full sm:max-w-sm lg:max-w-md mx-auto">
         <div className="flex justify-between items-center mb-4">
            <span className="text-gray-500 text-sm lg:text-base">Available Balance</span>
            <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" className="sr-only peer" />
               <div className="w-8 h-5 bg-gray-300 rounded-full peer-checked:bg-blue-500 relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-0 peer-checked:translate-x-full transition-transform"></div>
               </div>
            </label>
         </div>
         <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">$12,234</div>
         <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">**** 4532</span>
            <img
               src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
               alt="Mastercard Logo"
               className="w-8 sm:w-10 object-contain"
            />
         </div>
      </div>
   );
}

export default AvaiableBalanceCard;
