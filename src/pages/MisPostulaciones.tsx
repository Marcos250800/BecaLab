import React, { useState, useEffect } from 'react';
import { Trash2, ExternalLink, Calendar, Building2, Clock, FolderOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MisPostulaciones = () => {
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('myApplications');
      if (stored) setApplications(JSON.parse(stored));
    } catch (e) { console.error(e); }
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm('¿Eliminar de la lista de seguimiento?')) {
      const updated = applications.filter(app => app.id !== id);
      setApplications(updated);
      localStorage.setItem('myApplications', JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mis Postulaciones</h1>
        <p className="text-slate-400">Seguimiento de tus trámites activos.</p>
      </div>

      {applications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-900 border border-slate-800 rounded-3xl mt-8 text-center">
          <div className="bg-slate-800/50 p-6 rounded-full mb-6">
             <FolderOpen size={48} className="text-slate-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Sin trámites activos</h2>
          <p className="text-slate-400 mb-8 max-w-md">Aún no has iniciado ninguna solicitud. Explora las becas disponibles y comienza tu futuro hoy.</p>
          <Link to="/scholarships" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all">
             Explorar Becas <ArrowRight size={18}/>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 mt-6">
          {applications.map((app) => (
            <div key={app.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-6 group hover:border-slate-700 transition-colors">
              <div className="flex-1 w-full">
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-indigo-500/20">{app.type}</span>
                   <span className="text-slate-500 text-xs flex items-center gap-1"><Clock size={12} /> Iniciado: {app.startedAt}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{app.title}</h3>
                <div className="flex gap-4 text-sm text-slate-400 mt-2">
                   <span className="flex items-center gap-1"><Building2 size={14}/> {app.entity}</span>
                   <span className="flex items-center gap-1"><Calendar size={14}/> Deadline: {app.deadline}</span>
                </div>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                 <a href={app.link} target="_blank" rel="noreferrer" className="flex-1 md:flex-none justify-center bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl font-bold flex gap-2 text-sm items-center transition-colors">Continuar <ExternalLink size={16} /></a>
                 <button onClick={() => handleDelete(app.id)} className="bg-red-500/10 text-red-400 p-3 rounded-xl hover:bg-red-500/20 hover:text-red-300 transition-colors"><Trash2 size={20} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MisPostulaciones;