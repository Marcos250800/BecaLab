import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, Bookmark, TrendingUp, Sparkles, Search,
  Building2, Calendar, Wallet, PlusCircle, ExternalLink,
  ArrowRight
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useAppContext, Scholarship } from '../AppContext';

const DashboardHome = () => {
  const { currentUser, scholarships, savedScholarships } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const openCount = scholarships.filter(s => s.status === 'Abierta').length;
  
  // Datos para Gráfico seguros
  const getCount = (str: string) => scholarships.filter(s => s.type.includes(str)).length;
  const typeData = [
    { name: 'Máster', value: getCount('Máster') },
    { name: 'Doctorado', value: getCount('Doctorado') },
    { name: 'Grado', value: getCount('Grado') },
  ].filter(d => d.value > 0);
  
  const COLORS = ['#6366f1', '#ec4899', '#10b981'];

  const handleStartProcess = (scholarship: Scholarship) => {
    try {
      const stored = localStorage.getItem('myApplications');
      const current = stored ? JSON.parse(stored) : [];
      if (current.find((s: any) => s.id === scholarship.id)) {
        alert("⚠️ Ya tienes este trámite iniciado.");
        return;
      }
      const newApp = { ...scholarship, startedAt: new Date().toLocaleDateString() };
      localStorage.setItem('myApplications', JSON.stringify([...current, newApp]));
      alert(`✅ Trámite iniciado: ${scholarship.title}`);
    } catch (e) { console.error(e); }
  };

  const filtered = scholarships.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.entity && s.entity.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-fade-in pb-10">
       {/* Welcome */}
       <div className="flex flex-col md:flex-row justify-between gap-4 items-end md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Hola, {currentUser?.name.split(' ')[0]} 👋</h1>
            <p className="text-slate-400">Tu panel de control de oportunidades académicas.</p>
          </div>
          <div className="relative w-full md:w-auto">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
             <input 
               type="text" 
               placeholder="Buscar beca..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-slate-900 border border-slate-800 text-white pl-10 pr-4 py-3 rounded-xl focus:border-indigo-500 outline-none w-full md:w-64"
             />
          </div>
       </div>

       {/* KPIs */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
             <div className="bg-blue-500/10 p-3 rounded-xl text-blue-500"><BookOpen size={24} /></div>
             <div><p className="text-slate-400 text-sm">Becas Abiertas</p><h3 className="text-3xl font-bold text-white">{openCount}</h3></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
             <div className="bg-purple-500/10 p-3 rounded-xl text-purple-500"><Bookmark size={24} /></div>
             <div><p className="text-slate-400 text-sm">Guardadas</p><h3 className="text-3xl font-bold text-white">{savedScholarships.length}</h3></div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
             <div className="bg-green-500/10 p-3 rounded-xl text-green-500"><TrendingUp size={24} /></div>
             <div><p className="text-slate-400 text-sm">Probabilidad</p><h3 className="text-3xl font-bold text-white">Alta</h3></div>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white flex items-center gap-2"><Sparkles size={20} className="text-yellow-500"/> Recomendadas</h2>
                <Link to="/scholarships" className="text-sm text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1">Ver todas <ArrowRight size={14}/></Link>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
               {filtered.slice(0, 4).map(s => (
                 <div 
                    key={s.id} 
                    onClick={() => navigate(`/scholarships/${s.id}`)}
                    className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all group cursor-pointer"
                 >
                    <div className="flex justify-between mb-3">
                       <div className="flex items-center gap-2">
                          <Building2 size={16} className="text-indigo-500" />
                          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">{s.entity}</span>
                       </div>
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${s.status === 'Abierta' ? 'text-green-400 bg-green-500/10 border-green-500/20' : 'text-slate-500 bg-slate-800 border-slate-700'}`}>
                          {s.status}
                       </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{s.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-1 mb-4">{s.description}</p>
                    
                    <div className="flex gap-4 text-sm text-slate-500 mb-6">
                       <div className="flex items-center gap-1.5"><Wallet size={14} className="text-slate-400"/> {s.amount}</div>
                       <div className="flex items-center gap-1.5"><Calendar size={14} className="text-slate-400"/> {s.deadline}</div>
                    </div>
                    
                    <div className="flex gap-3 pt-4 border-t border-slate-800">
                       <button 
                          onClick={(e) => { e.stopPropagation(); handleStartProcess(s); }} 
                          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2.5 rounded-xl font-bold flex justify-center gap-2 text-sm items-center"
                       >
                          <PlusCircle size={16} /> Iniciar
                       </button>
                       <a 
                          href={s.link} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="px-4 py-2.5 rounded-xl text-slate-400 hover:text-white bg-slate-950 border border-slate-800 flex items-center gap-2 text-sm font-bold"
                       >
                          Oficial <ExternalLink size={14} />
                       </a>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-min sticky top-24">
             <h3 className="font-bold text-white mb-6">Distribución por Tipo</h3>
             <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie data={typeData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                        {typeData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                      </Pie>
                   </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="flex flex-col gap-3 mt-4">
                {typeData.map((entry, index) => (
                   <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm text-slate-400">{entry.name}</span>
                      </div>
                      <span className="text-white font-bold">{entry.value}</span>
                   </div>
                ))}
             </div>
          </div>
       </div>
    </div>
  );
};

export default DashboardHome;