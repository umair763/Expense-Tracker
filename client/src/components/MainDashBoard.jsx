import AvaiableBalanceCard from './Dashboard/AvaiableBalanceCard';
import TrackFinance from './Dashboard/TrackFinance';
import Categories from './Dashboard/Catagories';
import MonthlyReportBarGraph from './Dashboard/MonthlyReportBarGraph';
import WeeklyReportBarGraph from './Dashboard/WeeklyReportBarGraph';
import IncomeAndSpendings from './Dashboard/IncomeAndSpendings';

function MainDashBoard() {
   return (
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
         {/* First Column (Center Section) */}
         <div className="lg:col-span-2 space-y-4">
            {/* Top Row: Available Balance & Income and Spendings */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-3">
               <AvaiableBalanceCard />
               <IncomeAndSpendings />
            </div>

            {/* Middle Row: Monthly Report Graph */}
            <div className="overflow-hidden">
               <MonthlyReportBarGraph />
            </div>

            {/* Bottom Row: Weekly Report Graph */}
            <div className="overflow-hidden">
               <WeeklyReportBarGraph />
            </div>
         </div>

         {/* Third Column (Right Section) */}
         <div className="space-y-6">
            <div className="overflow-hidden">
               <TrackFinance />
            </div>
            <div className="overflow-hidden">
               <Categories />
            </div>
         </div>
      </div>
   );
}

export default MainDashBoard;
