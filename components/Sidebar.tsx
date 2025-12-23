import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  ShieldCheck, 
  Bookmark, 
  BookOpen, 
  User, 
  X, 
  GraduationCap, 
  LogOut 
} from 'lucide-react';
import { useAppContext, ADMIN_EMAIL } from '../AppContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPath }) => {
  const { currentUser, logout } = useAppContext();
  
  if (!currentUser) return null;

  const links = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Becas Disponibles', icon: Search, path: '/scholarships' },
    // Admin Tools Link (Only for Admin)
    ...(currentUser.email === ADMIN_EMAIL ? [{ name: 'Herramientas Admin', icon: ShieldCheck, path: '/admin-tools' }] : []),
    { name: 'Mis Postulaciones', icon: Bookmark, path: '/mis-postulaciones' },
    { name: 'Academy', icon: BookOpen, path: '/blog' },
    { name: 'Mi Perfil', icon: User, path: '/profile' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm" onClick={onClose} />
      )}

      <aside className={`
        fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 ease-in-out flex flex-col
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex items-center justify-between p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-indigo-500">
            <GraduationCap className="h-8 w-8" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              BecaLab
            </span>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = currentPath === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-indigo-600/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.15)] border border-indigo-500/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-indigo-300'
                }`}
              >
                <Icon size={20} className={isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
           <button 
             onClick={logout}
             className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
           >
             <LogOut size={20} />
             <span className="font-medium">Cerrar Sesión</span>
           </button>
        </div>

        <div className="p-6 pt-2">
          <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shrink-0">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-400 truncate w-32" title={currentUser.email}>{currentUser.email}</p>
              </div>
            </div>
            {currentUser.email === ADMIN_EMAIL && (
              <div className="mb-2 text-xs text-center text-indigo-400 font-bold border border-indigo-500/30 rounded py-1 bg-indigo-500/10">
                ADMIN
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;