import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAppContext } from '../AppContext';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { currentUser } = useAppContext();
  
  return (
    <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between lg:justify-end">
       <div className="flex items-center gap-4 lg:hidden">
         <button onClick={onMenuClick} className="text-slate-400 hover:text-white transition-colors">
           <Menu size={24} />
         </button>
         <span className="font-bold text-white">BecaLab</span>
       </div>

       <div className="flex items-center gap-4">
          <button className="relative text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
             <Bell size={20} />
             {/* Notification dot placeholder */}
             <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-950 hidden"></span>
          </button>
          
          <div className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-800">
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white leading-none">{currentUser?.name}</p>
                <p className="text-xs text-slate-500 mt-1">{currentUser?.educationLevel || 'Estudiante'}</p>
             </div>
             <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-slate-900">
                {currentUser?.name.charAt(0)}
             </div>
          </div>
       </div>
    </header>
  );
};

export default Header;