import { useState } from 'react';
import './App.css';
import SideBar from './components/SideBar';
import MainDashBoard from './components/MainDashBoard';

function App() {
   return (
      <>
         <div className="min-h-screen bg-[#383838]">
            <SideBar />
            <MainDashBoard />
         </div>
      </>
   );
}

export default App;
