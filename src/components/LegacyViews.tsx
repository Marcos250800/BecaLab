import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Loader2, Mail, Lock, Eye, EyeOff, GraduationCap, ArrowLeft, 
  Calendar, CheckCircle, CheckCircle2, Heart, Globe, Building2, 
  Search, ExternalLink, PlusCircle, PlayCircle, Clock, XCircle
} from 'lucide-react';
import { useAppContext, ARTICLES_DATA, ADMIN_EMAIL, Scholarship } from '../AppContext';

// ==========================================
// 1. LOGIN VIEW
// ==========================================
export const LoginView = () => {
  const { login } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if(!email) return;
    setLoading(true);
    setTimeout(() => {
      login(email, email.split('@')[0]);
      setLoading(false);
    }, 800);
  };

  const handleGoogleMock = () => {
    setLoading(true);
    setTimeout(() => {
      login(ADMIN_EMAIL, "Admin Visag"); 
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px]" />
      </div>
      
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl z-10 animate-fade-in relative overflow-hidden">
        <div className="p-8 pb-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-950 rounded-full border border-slate-800 mb-6 shadow-lg">
             <GraduationCap size={32} className="text-indigo-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">BecaLab</h1>
          <p className="text-slate-400 text-sm">Tu futuro académico empieza aquí</p>
        </div>
        
        <div className="px-8 pb-8 space-y-6">
          <button onClick={handleGoogleMock} disabled={loading} className="w-full bg-white hover:bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-3">
             {loading ? <Loader2 className="animate-spin" size={20} /> : <span className="font-serif font-bold text-lg">G</span>}
             <span className="font-medium">Continuar con Google</span>
          </button>
          
          <div className="relative flex items-center gap-4">
            <div className="h-px bg-slate-800 flex-1"></div>
            <span className="text-slate-500 text-xs font-medium uppercase">O</span>
            <div className="h-px bg-slate-800 flex-1"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
             <div className="space-y-1.5">
               <div className="relative">
                 <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                 <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email" 
                    className="w-full bg-slate-950 border border-slate-700 text-white pl-10 pr-4 py-3 rounded-xl focus:border-indigo-500 outline-none" 
                    required 
                 />
               </div>
             </div>
             <div className="space-y-1.5">
               <div className="relative">
                 <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                 <input 
                    type={showPassword ? "text" : "password"} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Contraseña" 
                    className="w-full bg-slate-950 border border-slate-700 text-white pl-10 pr-10 py-3 rounded-xl focus:border-indigo-500 outline-none" 
                    required 
                 />
                 <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                   {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                 </button>
               </div>
             </div>
             <button type="submit" disabled={loading} className="w-full bg-slate-950 hover:bg-slate-800 border border-slate-700 text-white font-bold py-3.5 rounded-xl transition-all">
               {loading ? <Loader2 className="animate-spin mx-auto" /> : "Iniciar Sesión"}
             </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. SCHOLARSHIPS VIEW (LISTA)
// ==========================================
export const ScholarshipsView = () => {
  const { scholarships } = useAppContext();
  const [filterText, setFilterText] = useState("");
  
  const filtered = scholarships.filter(s => 
    s.title.toLowerCase().includes(filterText.toLowerCase()) || 
    (s.entity && s.entity.toLowerCase().includes(filterText.toLowerCase()))
  );

  const handleStartProcess = (scholarship: Scholarship) => {
    try {
      const stored = localStorage.getItem('myApplications');
      const current = stored ? JSON.parse(stored) : [];
      
      if (current.find((s: any) => s.id === scholarship.id)) {
        alert("⚠️ Ya tienes este trámite en curso en 'Mis Postulaciones'.");
        return;
      }

      const newApp = {
        ...scholarship,
        startedAt: new Date().toLocaleDateString(),
        processStatus: 'Iniciado'
      };

      localStorage.setItem('myApplications', JSON.stringify([...current, newApp]));
      alert(`✅ ¡Trámite iniciado para ${scholarship.title}!\nConsulta la sección 'Mis Postulaciones'.`);
    } catch (error) {
      console.error(error);
      alert("Error al guardar el trámite.");
    }
  };

  return (
    <div className="w-full space-y-6 animate-fade-in pb-12">
      {/* Header de la sección */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Becas Disponibles</h2>
          <p className="text-slate-400">Oportunidades oficiales verificadas ({filtered.length})</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
             type="text" 
             placeholder="Buscar beca o entidad..." 
             value={filterText} 
             onChange={(e) => setFilterText(e.target.value)} 
             className="w-full bg-slate-900 border border-slate-800 text-white pl-10 pr-4 py-3 rounded-xl focus:border-indigo-500 outline-none" 
          />
        </div>
      </div>

      {/* Grid de Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((scholarship) => (
          <div 
            key={scholarship.id} 
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col h-full"
          >
            {/* Cabecera de la Tarjeta */}
            <div className="flex justify-between items-start mb-4">
              <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                scholarship.status === 'Abierta' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {scholarship.status === 'Abierta' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                {scholarship.status}
              </div>
              <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-md text-[10px] text-slate-300 font-medium">
                {scholarship.type}
              </span>
            </div>

            {/* Contenido Principal */}
            <div className="mb-6 flex-grow">
              <div className="flex items-center gap-2 mb-2">
                 <Building2 size={14} className="text-indigo-400"/>
                 <span className="text-slate-400 text-xs font-bold uppercase tracking-wide truncate max-w-[200px]">{scholarship.entity}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3 leading-snug group-hover:text-indigo-400 transition-colors line-clamp-2 min-h-[50px]">
                {scholarship.title}
              </h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                {scholarship.description}
              </p>
              
              <div className="bg-slate-950 rounded-lg p-3 border border-slate-800/50 group-hover:border-slate-700 transition-colors">
                <p className="text-green-400 text-xs font-bold mb-0.5">Monto / Ayuda:</p>
                <p className="text-slate-200 text-sm font-medium leading-tight">
                  {scholarship.amount}
                </p>
              </div>
            </div>

            {/* Metadatos (Footer interno) */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-6 border-t border-slate-800 pt-4">
              <div className="flex items-center gap-1.5" title="Fecha límite">
                <Clock size={14} className="text-slate-500" />
                <span>{scholarship.deadline}</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded border border-slate-800 bg-slate-950">
                 <span className={`w-1.5 h-1.5 rounded-full ${scholarship.probability === 'Alta' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : scholarship.probability === 'Media' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                 <span className="font-medium text-slate-400">Prob. Visa: {scholarship.probability}</span>
              </div>
            </div>

            {/* Botones de Acción */}
            <div className="grid grid-cols-2 gap-3 mt-auto">
              <a 
                href={scholarship.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800 text-xs font-bold transition-all"
              >
                <Globe size={14} />
                Oficial
              </a>
              <button 
                onClick={() => handleStartProcess(scholarship)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/20 text-xs font-bold transition-all"
              >
                <PlusCircle size={16} />
                Iniciar
              </button>
            </div>
             {/* Enlace a detalles absolutos para clickear tarjeta (opcional) */}
            <Link to={`/scholarships/${scholarship.id}`} className="absolute top-4 right-4 text-slate-600 hover:text-indigo-400 p-1"><ExternalLink size={16}/></Link>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 3. SCHOLARSHIP DETAIL VIEW
// ==========================================
export const ScholarshipDetailView = () => {
  const { scholarships, savedScholarships, toggleSaveScholarship } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const s = scholarships.find(item => item.id === Number(id));
  
  if (!s) return <div className="text-center py-20 text-slate-500">Beca no encontrada</div>;
  const isSaved = savedScholarships.includes(s.id);
  
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-4 transition-colors">
        <ArrowLeft size={18} /> Volver al listado
      </button>
      
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 text-indigo-400 mb-6 bg-slate-950/50 w-fit px-4 py-2 rounded-full border border-slate-800">
           <Building2 size={20} />
           <span className="font-bold tracking-wide uppercase text-sm">{s.entity}</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">{s.title}</h1>
        <p className="text-slate-300 text-lg mb-8 leading-relaxed border-l-4 border-indigo-500 pl-4 bg-indigo-500/5 py-4 pr-4 rounded-r-xl">{s.description}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <p className="text-slate-500 text-xs uppercase font-bold mb-2 flex items-center gap-2"><Globe size={14}/> Monto</p>
              <p className="text-green-400 font-bold text-lg">{s.amount}</p>
           </div>
           <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <p className="text-slate-500 text-xs uppercase font-bold mb-2 flex items-center gap-2"><Clock size={14}/> Cierre</p>
              <p className="text-white font-bold text-lg">{s.deadline}</p>
           </div>
           <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <p className="text-slate-500 text-xs uppercase font-bold mb-2 flex items-center gap-2"><GraduationCap size={14}/> Tipo</p>
              <p className="text-indigo-400 font-bold text-lg">{s.type}</p>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-800">
            <button onClick={() => toggleSaveScholarship(s.id)} className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isSaved ? 'bg-green-600 hover:bg-green-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
                {isSaved ? <CheckCircle size={20}/> : <Heart size={20}/>} {isSaved ? 'Guardada en Favoritos' : 'Guardar Beca'}
            </button>
            <a href={s.link} target="_blank" rel="noreferrer" className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all">
                Visitar Sitio Oficial <ExternalLink size={20}/>
            </a>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. BLOG & OTHERS (Sin cambios lógicos mayores, solo limpieza)
// ==========================================
export const BlogView = () => (
    <div className="space-y-8 animate-fade-in">
       <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">BecaLab Academy</h1>
          <p className="text-slate-400">Recursos para potenciar tu perfil y ganar becas.</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {ARTICLES_DATA.map(a => (
            <Link to={`/blog/${a.id}`} key={a.id} className="block group">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 group-hover:border-indigo-500/50 transition-colors h-full flex flex-col">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-2">{a.title}</h3>
                    <div className="mt-auto pt-4 flex items-center gap-2 text-slate-500 text-sm">
                       <Clock size={14}/> {a.readTime} de lectura
                    </div>
                </div>
            </Link>
           ))}
       </div>
    </div>
);

export const ArticleDetailView = () => {
  const { id } = useParams();
  const article = ARTICLES_DATA.find(a => a.id === Number(id));
  if (!article) return <div className="text-white text-center py-20">Artículo no encontrado</div>;
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <Link to="/blog" className="text-slate-400 hover:text-white mb-6 inline-flex items-center gap-2"><ArrowLeft size={16}/> Volver al blog</Link>
      <h1 className="text-4xl font-bold text-white mb-8">{article.title}</h1>
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl text-slate-300 leading-relaxed">
         Contenido del artículo...
      </div>
    </div>
  );
};

export const AdminToolsView = () => <div className="text-white p-4 bg-slate-900 rounded-xl border border-slate-800">Panel de Administración (Solo lectura)</div>;
export const ProfileView = () => <div className="text-white p-4 bg-slate-900 rounded-xl border border-slate-800">Perfil del Usuario</div>;