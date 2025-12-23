import React from 'react';
import { FolderOpen } from 'lucide-react';

const MisPostulaciones = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mis Postulaciones</h1>
        <p className="text-slate-400">Gestiona tus procesos activos.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
         <div className="bg-slate-800/50 p-6 rounded-full mb-6">
            <FolderOpen size={48} className="text-slate-500" />
         </div>
         <h2 className="text-2xl font-bold text-white mb-2">Sin postulaciones</h2>
         <p className="text-slate-400 max-w-md">
           Aquí aparecerán los trámites que inicies.
         </p>
      </div>
    </div>
  );
};

export default MisPostulaciones;