import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { 
  Loader2, Mail, Lock, Eye, EyeOff, GraduationCap, ArrowLeft, 
  Calendar, CheckCircle, CheckCircle2, Heart, Globe, Building2, 
  Search, ExternalLink, PlusCircle, PlayCircle, Clock, XCircle, ArrowRight,
  AlertTriangle, FileText, Check, X, HelpCircle, Lightbulb, Plane, Ban, ShieldAlert,
  UserCheck, FileSignature, Languages, ListOrdered, Target, Sparkles, Briefcase, Users, BrainCircuit,
  TrendingUp
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
  const navigate = useNavigate(); // Hook para navegación programática
  
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
            onClick={() => navigate(`/scholarships/${scholarship.id}`)}
            className="group relative bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col h-full cursor-pointer"
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
              
              <div className="bg-slate-900 rounded-lg p-3 border border-slate-800/50 group-hover:border-slate-700 transition-colors">
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
                onClick={(e) => e.stopPropagation()} 
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800 text-xs font-bold transition-all"
              >
                <Globe size={14} />
                Oficial
              </a>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartProcess(scholarship);
                }}
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
  
  // Estado para saber si ya se inició el trámite
  const [isStarted, setIsStarted] = useState(false);

  // Verificar al cargar si ya existe en localStorage
  useEffect(() => {
    if(!s) return;
    try {
        const stored = localStorage.getItem('myApplications');
        if(stored) {
            const apps = JSON.parse(stored);
            if(apps.find((app: any) => app.id === s.id)) {
                setIsStarted(true);
            }
        }
    } catch(e) {}
  }, [s]);

  const handleStartProcess = () => {
    if (!s) return;
    try {
      const stored = localStorage.getItem('myApplications');
      const current = stored ? JSON.parse(stored) : [];
      
      // Si ya existe, redirigir
      if (current.find((app: any) => app.id === s.id)) {
        navigate('/mis-postulaciones');
        return;
      }

      // Si no, agregarlo
      const newApp = {
        ...s,
        startedAt: new Date().toLocaleDateString(),
        processStatus: 'Iniciado'
      };

      localStorage.setItem('myApplications', JSON.stringify([...current, newApp]));
      setIsStarted(true);
      
      // Feedback usuario
      if(window.confirm(`✅ ¡Trámite iniciado para ${s.title}!\n\n¿Quieres ver tus postulaciones ahora?`)) {
         navigate('/mis-postulaciones');
      }
    } catch (error) {
      console.error(error);
      alert("Error al iniciar el trámite.");
    }
  };
  
  if (!s) return <div className="text-center py-20 text-slate-500">Beca no encontrada</div>;
  
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
            {/* BOTÓN PRINCIPAL REEMPLAZADO */}
            <button 
                onClick={handleStartProcess} 
                className={`flex-1 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                    isStarted 
                    ? 'bg-green-500/10 text-green-400 border border-green-500/20 hover:bg-green-500/20 shadow-green-900/10' 
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
                }`}
            >
                {isStarted ? <CheckCircle size={24}/> : <PlayCircle size={24}/>} 
                <span className="text-lg">{isStarted ? 'Ver en Mis Postulaciones' : 'Iniciar Trámite'}</span>
            </button>
            
            <a href={s.link} target="_blank" rel="noreferrer" className="flex-1 bg-slate-950 border border-slate-800 hover:bg-slate-900 text-slate-300 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                Visitar Sitio Oficial <ExternalLink size={20}/>
            </a>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 4. BLOG & OTHERS (REDESIGNED)
// ==========================================
export const BlogView = () => (
    <div className="space-y-8 animate-fade-in pb-12">
       <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">BecaLab Academy</h1>
            <p className="text-slate-400">Guías, documentación y recursos para potenciar tu perfil.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {ARTICLES_DATA.map(article => (
            <div key={article.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden group hover:border-slate-700 transition-all flex flex-col h-full">
                {/* Imagen */}
                <div className="h-48 w-full overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10 opacity-60"></div>
                   <img 
                     src={article.imageUrl} 
                     alt={article.title} 
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                   />
                </div>
                
                {/* Contenido */}
                <div className="p-6 flex flex-col flex-grow">
                   <div className="mb-3">
                      <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide border ${
                        article.category === 'Guías' 
                          ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                         {article.category}
                      </span>
                   </div>
                   
                   <h3 className="text-lg font-bold text-white mb-3 leading-snug line-clamp-2">
                     {article.title}
                   </h3>
                   
                   <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                     {article.description}
                   </p>
                   
                   <Link 
                     to={`/blog/${article.id}`} 
                     className="flex items-center gap-2 text-indigo-400 text-sm font-bold hover:text-indigo-300 transition-colors mt-auto"
                   >
                     Leer más <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
            </div>
           ))}
       </div>
    </div>
);

export const ArticleDetailView = () => {
  const { id } = useParams();
  const article = ARTICLES_DATA.find(a => a.id === Number(id));
  
  if (!article) return <div className="text-white text-center py-20">Artículo no encontrado</div>;

  // --- CONTENIDO ESPECÍFICO PARA EL ARTÍCULO ID 1 (CV) ---
  const ArticleContentCV = () => (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-8">
      {/* 🎯 INTRODUCCIÓN */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">El primer filtro: 30 segundos para causar impacto</h2>
        <p>Imagínate por un momento en los zapatos de un evaluador de becas. Tienes 500 aplicaciones sobre tu escritorio y apenas 20 becas disponibles. ¿Cuánto tiempo crees que dedicas a cada currículum? La respuesta te sorprenderá: apenas 30 segundos.</p>
        <p className="mt-4">En esos críticos 30 segundos, tu CV debe gritar "¡Soy el candidato perfecto!" sin necesidad de palabras. Los reclutadores de becas buscan patrones específicos:</p>
        <ul className="list-disc pl-6 space-y-2 mt-4 marker:text-indigo-500">
          <li>Consistencia académica demostrada</li>
          <li>Experiencias relevantes al programa</li>
          <li>Habilidades transferibles claramente identificadas</li>
          <li>Potencial de impacto en su institución</li>
          <li>Estadísticas que te harán reflexionar sobre la competencia</li>
        </ul>
      </section>

      {/* 📊 ESTADÍSTICAS */}
      <section className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
           <TrendingUp size={24} className="text-indigo-500"/> Los números no mienten
        </h3>
        <ul className="space-y-3">
            <li className="flex items-start gap-3"><span className="text-indigo-500 font-bold">•</span> 1 de cada 50 solicitudes de becas internacionales son exitosas</li>
            <li className="flex items-start gap-3"><span className="text-indigo-500 font-bold">•</span> El 60% de los CVs son descartados en los primeros 10 segundos</li>
            <li className="flex items-start gap-3"><span className="text-indigo-500 font-bold">•</span> Solo el 15% de los candidatos adapta su CV específicamente para becas</li>
            <li className="flex items-start gap-3"><span className="text-indigo-500 font-bold">•</span> Los CVs con palabras clave relevantes tienen 3 veces más probabilidades de pasar el primer filtro</li>
        </ul>
      </section>

      {/* 💡 DIFERENCIA LABORAL vs BECAS */}
      <section>
         <div className="bg-indigo-500/10 border-l-4 border-indigo-500 p-5 rounded-r-lg my-6">
           <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Lightbulb size={20} className="text-indigo-400"/> La diferencia clave</h3>
           <p className="text-slate-300 m-0">
             Aquí está el primer error que cometen la mayoría: usar el mismo CV para trabajos y becas. Un CV para becas debe enfocarse en logros académicos, potencial de investigación e impacto social, mientras que un CV laboral se centra en experiencia profesional y resultados financieros.
           </p>
         </div>
      </section>

      {/* 🔍 QUÉ BUSCAN LOS EVALUADORES */}
      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">QUÉ BUSCAN REALMENTE LOS EVALUADORES</h2>
        <p className="mb-4">Los comités de selección no son máquinas, son personas apasionadas por la educación que buscan candidatos que compartan esa pasión. Pero también tienen criterios muy específicos.</p>
        
        <h3 className="text-lg font-bold text-white mt-6 mb-3">Palabras clave que abren puertas</h3>
        <p className="mb-4 text-sm text-slate-400">Cada programa de becas tiene su ADN lingüístico. Los sistemas automáticos escanean tu CV buscando términos específicos:</p>
        
        <div className="overflow-x-auto border border-slate-700 rounded-xl mb-6">
           <table className="w-full text-left border-collapse bg-slate-800/50">
             <thead>
               <tr className="border-b border-slate-700 bg-slate-800 text-slate-200">
                 <th className="p-4 font-bold">Área de Estudio</th>
                 <th className="p-4 font-bold">Palabras Clave Esenciales</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-700 text-sm">
               <tr>
                 <td className="p-4 text-white font-medium">STEM</td>
                 <td className="p-4 text-slate-400">Investigación, análisis, innovación, metodología</td>
               </tr>
               <tr>
                 <td className="p-4 text-white font-medium">Humanidades</td>
                 <td className="p-4 text-slate-400">Análisis crítico, investigación cualitativa, interpretación</td>
               </tr>
               <tr>
                 <td className="p-4 text-white font-medium">Negocios</td>
                 <td className="p-4 text-slate-400">Liderazgo, gestión de proyectos, emprendimiento</td>
               </tr>
               <tr>
                 <td className="p-4 text-white font-medium">Arte/Diseño</td>
                 <td className="p-4 text-slate-400">Creatividad, expresión artística, portfolio</td>
               </tr>
             </tbody>
           </table>
        </div>
      </section>

      {/* 📝 ESTRUCTURA PERFECTA */}
      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">ESTRUCTURA PERFECTA DE UN CV GANADOR</h2>
        <p className="mb-6">Tu CV es como una sinfonía bien orquestada: cada sección debe fluir naturalmente hacia la siguiente.</p>
        
        <div className="space-y-6">
           {/* Contacto */}
           <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">1. Información de contacto profesional</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
                    <p className="text-green-400 font-bold text-xs uppercase mb-2 flex items-center gap-1"><CheckCircle2 size={12}/> Hazlo bien</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4">
                       <li>Nombre completo (sin apodos)</li>
                       <li>Email profesional: nombre.apellido@gmail.com</li>
                       <li>Teléfono con código de país</li>
                       <li>LinkedIn actualizado</li>
                    </ul>
                 </div>
                 <div className="bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                    <p className="text-red-400 font-bold text-xs uppercase mb-2 flex items-center gap-1"><XCircle size={12}/> Evita errores</p>
                    <ul className="text-sm text-slate-300 space-y-1 list-disc pl-4">
                       <li>Emails como "gatitolindo2024..."</li>
                       <li>Títulos como "CV" o "Currículum"</li>
                       <li>Info personal irrelevante (estado civil)</li>
                    </ul>
                 </div>
              </div>
           </div>

           {/* Redacción Poderosa */}
           <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl">
              <h3 className="text-lg font-bold text-white mb-3">2. Redacción que vende sin mentir</h3>
              <p className="text-sm text-slate-400 mb-4">Usa verbos de acción y contextualiza tus logros.</p>
              
              <div className="space-y-3 text-sm">
                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-2 bg-slate-950 rounded border border-slate-800">
                    <span className="text-red-400 line-through decoration-red-500/50">"Ayudé en un proyecto"</span>
                    <ArrowRight size={14} className="text-slate-600 hidden sm:block"/>
                    <span className="text-green-400 font-bold">"Coordiné, diseñé, implementé, lideré"</span>
                 </div>
                 <div className="flex flex-col sm:flex-row sm:items-center gap-2 p-2 bg-slate-950 rounded border border-slate-800">
                    <span className="text-red-400 line-through decoration-red-500/50">"Mejoré las ventas"</span>
                    <ArrowRight size={14} className="text-slate-600 hidden sm:block"/>
                    <span className="text-green-400 font-bold">"Incrementé las ventas en un 25% durante prácticas"</span>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 🎨 DISEÑO Y FORMATO */}
      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4">DISEÑO Y FORMATO: LA PRIMERA IMPRESIÓN</h2>
        <p className="mb-4">El diseño de tu CV comunica antes de que lean una sola palabra.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
           <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h4 className="text-white font-bold mb-2">Diseño Ganador</h4>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                 <li>Tipografía legible (Arial, Calibri, 10-12pt)</li>
                 <li>Márgenes de 2.5cm mínimo</li>
                 <li>Jerarquía visual clara (Negritas)</li>
                 <li>Color minimalista (Máx 2)</li>
              </ul>
           </div>
           <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h4 className="text-white font-bold mb-2">Formatos de Archivo</h4>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                 <li><span className="text-green-400 font-bold">PDF (Siempre):</span> Primera opción</li>
                 <li>Word (.docx): Solo si lo piden</li>
                 <li><span className="text-red-400">Nunca:</span> JPG o PNG</li>
              </ul>
           </div>
        </div>
      </section>

      {/* ⚠️ ERRORES COMUNES */}
      <section className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 mt-8">
         <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={24}/> ERRORES MÁS COMUNES
         </h2>
         <div className="space-y-4">
            <div>
               <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Mentiras que se descubren</h4>
               <p className="text-slate-400 text-sm">Inflación de notas, experiencias inventadas o habilidades inexistentes. <span className="text-white font-bold">Regla de oro:</span> Si no puedes hablarlo con confianza en una entrevista, no lo pongas.</p>
            </div>
            <div>
               <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Información irrelevante</h4>
               <p className="text-slate-400 text-sm">Elimina pasatiempos genéricos ("leer, viajar") y trabajos de adolescencia sin relevancia.</p>
            </div>
            <div>
               <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-1">Errores "Amateur"</h4>
               <p className="text-slate-400 text-sm">Inconsistencias en fechas, errores tipográficos y alineación deficiente.</p>
            </div>
         </div>
      </section>

      {/* ✅ CHECKLIST FINAL */}
      <section className="mt-8">
         <h2 className="text-2xl font-bold text-white mb-4">TABLA DE VERIFICACIÓN FINAL</h2>
         <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            {[
               "Información de contacto profesional", 
               "Formato y diseño limpio y legible", 
               "Contenido relevante y de valor", 
               "Palabras clave del programa incluidas", 
               "Números y logros cuantificados",
               "Revisión de ortografía y gramática"
            ].map((item, i) => (
               <div key={i} className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/50 transition-colors">
                  <span className="text-slate-300 text-sm font-medium">{item}</span>
                  <CheckCircle2 size={18} className="text-green-500"/>
               </div>
            ))}
         </div>
      </section>
    </div>
  );

  // --- CONTENIDO ESPECÍFICO PARA EL ARTÍCULO ID 2 (PROMEDIO BAJO) ---
  const ArticleContentLowGpa = () => (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-8">
        {/* Intro */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">El mito del expediente perfecto</h2>
          <h3 className="text-xl font-bold text-indigo-400 mb-4">Las becas no son solo para promedios de 10</h3>
          <p>Muchos estudiantes se auto-descartan al pensar que no pueden optar a una beca porque su promedio académico es un 7 u 8.</p>
          <div className="bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg my-4">
             <p className="text-red-300 font-medium m-0">Este es uno de los errores más comunes —y más costosos— en los procesos de postulación.</p>
          </div>
          <p>La realidad es que la mayoría de programas de becas no buscan expedientes perfectos, sino perfiles completos, con proyección y potencial de impacto.</p>
          <p>Fundaciones y programas internacionales valoran cada vez más quién eres, no solo cuánto sacaste en un examen.</p>
        </section>

        {/* Qué buscan */}
        <section>
          <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-2">
            <Search size={24} className="text-indigo-500"/> Qué buscan realmente los comités de selección
          </h2>
          <p className="mb-4">Aunque el expediente académico es importante, no es el único ni el principal criterio. En muchos casos, el promedio actúa como un filtro mínimo, pero la decisión final se basa en otros factores:</p>
          <ul className="list-disc pl-6 space-y-2 marker:text-indigo-500 mb-6">
             <li>Trayectoria personal y profesional</li>
             <li>Capacidad de liderazgo</li>
             <li>Compromiso social</li>
             <li>Claridad de objetivos</li>
             <li>Coherencia entre estudios, experiencia y futuro profesional</li>
          </ul>
          <div className="bg-indigo-500/10 border border-indigo-500/20 p-6 rounded-xl text-center">
             <p className="text-xl text-white font-serif italic">"Un estudiante con un 7 bien explicado puede resultar mucho más interesante que uno con un 10 sin contexto."</p>
          </div>
        </section>

        {/* Técnica Sandwich */}
        <section>
           <h2 className="text-2xl font-bold text-white mt-8 mb-4">La técnica del "sándwich" en la carta de motivación</h2>
           <p className="mb-4">Cuando tus notas no son brillantes, la carta de motivación se convierte en tu herramienta más poderosa. La clave no está en ocultar el promedio, sino en contextualizarlo estratégicamente.</p>
           <p className="mb-6">La técnica del "sándwich" consiste en rodear el dato académico con elementos que refuercen tu perfil:</p>

           <div className="space-y-4">
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
                 <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Briefcase size={20} className="text-indigo-500"/> 1. Experiencia real</h3>
                 <p className="text-slate-400 text-sm mb-2">¿Has trabajado mientras estudiabas? ¿Has tenido responsabilidades profesionales o familiares?</p>
                 <p className="text-green-400 text-sm font-bold flex items-center gap-2"><CheckCircle2 size={14}/> Para muchos comités, la experiencia práctica demuestra madurez, disciplina y capacidad de gestión del tiempo.</p>
              </div>
              
              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
                 <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><Users size={20} className="text-indigo-500"/> 2. Voluntariado y compromiso social</h3>
                 <p className="text-slate-400 text-sm mb-2">La participación en proyectos sociales, comunitarios o educativos refleja valores que muchas becas priorizan: Responsabilidad social, Empatía, Iniciativa.</p>
                 <p className="text-indigo-400 text-sm font-bold">No es un "extra", es una señal clara de impacto potencial.</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-slate-700 transition-colors">
                 <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2"><BrainCircuit size={20} className="text-indigo-500"/> 3. Habilidades blandas (soft skills)</h3>
                 <p className="text-slate-400 text-sm mb-2">Liderazgo, resiliencia, pensamiento crítico, proactividad y capacidad de adaptación son competencias difíciles de medir con notas, pero muy valoradas en procesos de selección.</p>
                 <p className="text-white text-sm">Bien explicadas, estas habilidades pueden redefinir completamente tu candidatura.</p>
              </div>
           </div>
        </section>

        {/* Cierre */}
        <section>
           <h2 className="text-2xl font-bold text-white mt-8 mb-4">La carta de motivación como factor decisivo</h2>
           <p className="mb-4">En perfiles con promedios medios, la carta de motivación no es un requisito más: <span className="text-indigo-400 font-bold">es el elemento que inclina la balanza.</span></p>
           
           <p className="mb-2">Una carta bien estructurada puede:</p>
           <ul className="list-disc pl-6 space-y-2 marker:text-green-500 mb-6">
              <li>Explicar tu contexto académico</li>
              <li>Justificar tu promedio sin excusas</li>
              <li>Mostrar crecimiento, coherencia y propósito</li>
           </ul>

           <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900 border border-indigo-500/30 p-8 rounded-2xl text-center mt-8">
              <p className="text-white text-lg font-medium leading-relaxed">Recuerda: Las becas no premian la perfección académica, premian el potencial y el compromiso.</p>
           </div>
        </section>
    </div>
  );

  // --- CONTENIDO ESPECÍFICO PARA EL ARTÍCULO ID 5 (CARTA MOTIVACIÓN - ACTUALIZADO) ---
  const ArticleContentMotivationLetter = () => (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-10">
      
      {/* 🎯 INTRO */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Target size={28} className="text-indigo-500"/> ¿QUÉ ES UNA CARTA DE MOTIVACIÓN PARA BECA Y POR QUÉ PUEDE CAMBIAR TU VIDA?
        </h2>
        <p>Una carta de motivación para beca es tu oportunidad de oro para demostrar por qué mereces esa financiación por encima de todos los demás candidatos. Es el documento que marca la diferencia entre ser seleccionado o quedar fuera de la competencia.</p>
        <p>Piénsalo así: tu expediente académico dice lo que has hecho, pero tu carta motivacional revela quién eres realmente y hacia dónde te diriges. Es tu momento de brillar y conectar emocionalmente con el comité de selección.</p>

        <h3 className="text-lg font-bold text-white mt-8 mb-4">La diferencia entre una carta motivacional y otros documentos</h3>
        <div className="overflow-x-auto border border-slate-700 rounded-xl bg-slate-900/50">
           <table className="w-full text-left border-collapse">
             <thead>
               <tr className="border-b border-slate-700 bg-slate-800 text-slate-200">
                 <th className="p-4 font-bold text-sm uppercase">Documento</th>
                 <th className="p-4 font-bold text-sm uppercase">Propósito</th>
                 <th className="p-4 font-bold text-sm uppercase">Enfoque</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-700 text-sm">
               <tr className="hover:bg-slate-800/30 transition-colors">
                 <td className="p-4 text-white font-bold">Carta de Motivación</td>
                 <td className="p-4 text-slate-400">Explicar por qué mereces la beca</td>
                 <td className="p-4 text-indigo-400 font-bold">Futuro y aspiraciones</td>
               </tr>
               <tr className="hover:bg-slate-800/30 transition-colors">
                 <td className="p-4 text-white font-medium">Statement of Purpose</td>
                 <td className="p-4 text-slate-400">Detallar objetivos académicos</td>
                 <td className="p-4 text-slate-400">Planes de estudio específicos</td>
               </tr>
               <tr className="hover:bg-slate-800/30 transition-colors">
                 <td className="p-4 text-white font-medium">Carta de Presentación</td>
                 <td className="p-4 text-slate-400">Aplicar a un empleo</td>
                 <td className="p-4 text-slate-400">Experiencia laboral</td>
               </tr>
               <tr className="hover:bg-slate-800/30 transition-colors">
                 <td className="p-4 text-white font-medium">Ensayo Personal</td>
                 <td className="p-4 text-slate-400">Contar tu historia</td>
                 <td className="p-4 text-slate-400">Experiencias pasadas</td>
               </tr>
             </tbody>
           </table>
        </div>
      </section>

      {/* 🔍 INVESTIGACIÓN */}
      <section className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
         <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
            <Search size={24} className="text-indigo-400"/> CÓMO INVESTIGAR ANTES DE ESCRIBIR TU CARTA
         </h2>
         <p className="mb-4 text-indigo-100">Nunca escribas una carta genérica. El secreto de las cartas motivacionales exitosas está en la personalización. Antes de escribir una sola palabra, debes convertirte en un detective de la institución.</p>
         
         <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-900 p-5 rounded-xl border border-indigo-500/10">
               <h4 className="text-white font-bold mb-2">Analiza el perfil</h4>
               <p className="text-sm text-slate-400">¿Qué valoran más: el liderazgo o el trabajo en equipo? ¿Son una universidad enfocada en la investigación o en la aplicación práctica?</p>
               <div className="mt-3 text-xs bg-indigo-500/20 text-indigo-300 p-2 rounded inline-block font-bold">
                  🕵️ Estrategia ninja: Visita "Sobre nosotros" y "Testimonios" en su web.
               </div>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-indigo-500/10">
               <h4 className="text-white font-bold mb-2">Descifra la misión</h4>
               <p className="text-sm text-slate-400">Si mencionan "sostenibilidad" o "innovación social", asegúrate de que tu carta refleje estos valores con ejemplos concretos.</p>
            </div>
         </div>
      </section>

      {/* ✍️ ESTRUCTURA */}
      <section>
         <h2 className="text-2xl font-bold text-white mb-6">✍️ ESTRUCTURA PASO A PASO</h2>
         
         <div className="space-y-6">
            <div className="relative pl-8 border-l-2 border-slate-700 pb-2">
               <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700"></div>
               <h3 className="text-xl font-bold text-white mb-2">1. Cabecera Profesional</h3>
               <div className="bg-slate-900 p-4 rounded-lg font-mono text-sm text-slate-400 border border-slate-800">
                  <p>[Tu nombre completo]</p>
                  <p>[Dirección + Teléfono + Email]</p>
                  <p>[LinkedIn (opcional)]</p>
                  <p className="mt-2 text-slate-500">[Fecha]</p>
                  <p className="mt-2">[Nombre de la institución]</p>
                  <p>[Departamento de becas]</p>
               </div>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-700 pb-2">
               <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
               <h3 className="text-xl font-bold text-white mb-2">2. Introducción (El Gancho)</h3>
               <p className="mb-3 text-sm">Debe responder: ¿Qué solicitas? ¿Por qué? ¿Cuál es tu objetivo?</p>
               <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500 italic text-slate-300 text-sm">
                  "Por medio de la presente, solicito la Beca Chevening... Tras investigar exhaustivamente los programas de sostenibilidad..."
               </div>
            </div>

            <div className="relative pl-8 border-l-2 border-slate-700 pb-2">
               <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500"></div>
               <h3 className="text-xl font-bold text-white mb-2">3. Cuerpo (El Núcleo)</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                     <strong className="text-indigo-400 block mb-1">Párrafo 1: Quién eres</strong>
                     Logros académicos, reconocimientos y formación actual.
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                     <strong className="text-indigo-400 block mb-1">Párrafo 2: Contribución</strong>
                     Qué valor único aportas (idiomas, voluntariado, diversidad).
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800">
                     <strong className="text-indigo-400 block mb-1">Párrafo 3: Por qué ellos</strong>
                     Conexión profunda con el programa, profesores o líneas de investigación.
                  </div>
               </div>
            </div>
            
             <div className="relative pl-8 border-l-2 border-slate-700">
               <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700"></div>
               <h3 className="text-xl font-bold text-white mb-2">4. Cierre y Llamada a la Acción</h3>
               <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-green-500 italic text-slate-300 text-sm">
                  "Estoy completamente convencido de que mi pasión por la energía renovable... Quedo a su disposición para ampliar cualquier información..."
               </div>
            </div>
         </div>
      </section>

      {/* ✅ CHECKLIST & ERRORES */}
      <section className="grid md:grid-cols-2 gap-8">
         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><CheckCircle2 className="text-green-500"/> Checklist Imprescindible</h3>
            <ul className="space-y-3">
               {[
                  "Datos de contacto completos",
                  "Saludo formal dirigido a persona correcta",
                  "Introducción clara sobre qué beca solicitas",
                  "Párrafo de logros académicos relevantes",
                  "Sección de contribución a la institución",
                  "Justificación específica de la universidad",
                  "Cierre profesional con agradecimiento",
                  "Formato PDF",
                  "Longitud máx 1.5 páginas"
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                     <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0"/> {item}
                  </li>
               ))}
            </ul>
         </div>

         <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Ban className="text-red-500"/> Errores a evitar</h3>
            <ul className="space-y-3">
               {[
                  "Carta genérica (Copy-paste)",
                  "Victimización (Pedir lástima)",
                  "Exageraciones o arrogancia",
                  "Errores ortográficos",
                  "Información irrelevante",
                  "Formato descuidado",
                  "Extensión excesiva (>1000 palabras)"
               ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                     <XCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0"/> {item}
                  </li>
               ))}
            </ul>
         </div>
      </section>

      {/* 📝 EJEMPLOS REALES */}
      <section>
          <h2 className="text-2xl font-bold text-white mb-6">📝 EJEMPLOS REALES EXITOSOS</h2>
          <div className="grid gap-6">
             <div className="bg-slate-900 border-l-4 border-blue-500 p-6 rounded-r-xl">
                <h4 className="text-blue-400 font-bold mb-2 text-sm uppercase">Becas de Administración</h4>
                <p className="italic text-slate-300 text-sm leading-relaxed">"Mi nombre es Andrea Martínez... Mi pasión por la gestión empresarial sostenible me ha llevado a fundar una startup social que emplea a 15 jóvenes en situación de vulnerabilidad..."</p>
             </div>
             <div className="bg-slate-900 border-l-4 border-purple-500 p-6 rounded-r-xl">
                <h4 className="text-purple-400 font-bold mb-2 text-sm uppercase">Programas de Ingeniería</h4>
                <p className="italic text-slate-300 text-sm leading-relaxed">"Durante mis estudios... he desarrollado tres proyectos de innovación. Mi proyecto de optimización energética logró reducir el consumo eléctrico en un 40%..."</p>
             </div>
             <div className="bg-slate-900 border-l-4 border-pink-500 p-6 rounded-r-xl">
                <h4 className="text-pink-400 font-bold mb-2 text-sm uppercase">Becas de Intercambio</h4>
                <p className="italic text-slate-300 text-sm leading-relaxed">"Haber crecido en una familia multicultural... me ha enseñado que la diversidad cultural es un activo invaluable..."</p>
             </div>
          </div>
      </section>

      {/* 🎨 FORMATO */}
      <section className="bg-slate-800/30 rounded-2xl p-6 border border-slate-800">
          <h2 className="text-xl font-bold text-white mb-4">🎨 Formato Visual y Longitud</h2>
          <div className="flex flex-col md:flex-row gap-6">
             <div className="flex-1 space-y-2 text-sm text-slate-300">
                <p><strong className="text-white">Fuente:</strong> Arial, Calibri (11-12pt)</p>
                <p><strong className="text-white">Márgenes:</strong> 2.5 cm</p>
                <p><strong className="text-white">Interlineado:</strong> 1.5</p>
                <p><strong className="text-white">Archivo:</strong> Siempre PDF</p>
             </div>
             <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-400"><div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden"><div className="bg-indigo-500 w-[10%] h-full"></div></div> Intro (10%)</div>
                <div className="flex items-center gap-2 text-xs text-slate-400"><div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden"><div className="bg-indigo-500 w-[60%] h-full"></div></div> Cuerpo (60%)</div>
                <div className="flex items-center gap-2 text-xs text-slate-400"><div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden"><div className="bg-indigo-500 w-[20%] h-full"></div></div> Cierre (20%)</div>
                <div className="flex items-center gap-2 text-xs text-slate-400"><div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden"><div className="bg-indigo-500 w-[10%] h-full"></div></div> Despedida (10%)</div>
             </div>
          </div>
      </section>

      {/* 🚀 CONSEJOS AVANZADOS */}
      <section>
         <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2"><Sparkles className="text-yellow-400"/> CONSEJOS AVANZADOS</h2>
         <p className="mb-4">Nunca uses la misma carta para diferentes becas. Cada institución tiene personalidad propia:</p>
         <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-900 p-3 rounded text-sm text-slate-300 border border-slate-800"><strong className="text-white block">Becas Erasmus</strong> Experiencia europea y diversidad.</div>
            <div className="bg-slate-900 p-3 rounded text-sm text-slate-300 border border-slate-800"><strong className="text-white block">Becas Fulbright</strong> Intercambio cultural bilateral.</div>
            <div className="bg-slate-900 p-3 rounded text-sm text-slate-300 border border-slate-800"><strong className="text-white block">Becas Chevening</strong> Liderazgo y networking.</div>
            <div className="bg-slate-900 p-3 rounded text-sm text-slate-300 border border-slate-800"><strong className="text-white block">Becas DAAD</strong> Excelencia académica alemana.</div>
         </div>
         
         <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
             <h4 className="text-white font-bold mb-2">💡 Estrategia de Valor Único</h4>
             <p className="text-sm text-slate-400 mb-3">Pregúntate: ¿Qué me hace diferente a los otros 10,000 candidatos?</p>
             <div className="p-3 bg-slate-800 rounded border-l-2 border-yellow-400 text-sm italic text-slate-300">
                "Mi experiencia como intérprete voluntario para refugiados me enseñó que la comunicación efectiva puede salvar vidas..."
             </div>
         </div>
      </section>

      {/* ❓ FAQ */}
      <section>
         <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><HelpCircle className="text-indigo-500"/> PREGUNTAS FRECUENTES</h2>
         <div className="space-y-4">
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
               <h4 className="text-white font-bold mb-2">¿Cuánto tiempo debería dedicar a escribir mi carta?</h4>
               <p className="text-sm text-slate-400">Entre 15-20 horas distribuidas en varios días. Incluye investigación, borrador, revisiones y edición final.</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
               <h4 className="text-white font-bold mb-2">¿Puedo mencionar mi situación económica?</h4>
               <p className="text-sm text-slate-400">Sí, pero hazlo con dignidad y enfoque positivo. Explica cómo la beca maximizará tu potencial, evitando la victimización.</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
               <h4 className="text-white font-bold mb-2">¿Debo mencionar otras becas?</h4>
               <p className="text-sm text-slate-400">No. Cada carta debe hacer sentir a la institución que es tu primera y única opción.</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
               <h4 className="text-white font-bold mb-2">¿Y si no tengo experiencia internacional?</h4>
               <p className="text-sm text-slate-400">Enfócate en experiencias locales que demuestren adaptación, liderazgo y trabajo en equipo. Son habilidades transferibles.</p>
            </div>
            <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
               <h4 className="text-white font-bold mb-2">Diferencia con el Statement of Purpose</h4>
               <p className="text-sm text-slate-400">La carta motivacional es "por qué tú y por qué ellos" (valor y ajuste). El SOP es "qué harás" (plan académico y de investigación).</p>
            </div>
         </div>
      </section>

      {/* 💡 CONSEJO FINAL */}
      <section className="bg-gradient-to-r from-indigo-900/50 to-slate-900 border border-indigo-500/30 p-8 rounded-2xl text-center">
          <p className="text-white text-lg font-medium leading-relaxed">
             💡 Consejo Final: Ahora que conoces la estructura exacta, es momento de practicar. Recuerda: la diferencia entre una carta promedio y una ganadora está en la personalización y la autenticidad.
          </p>
          <div className="mt-4 text-sm text-indigo-300">
             En BecaLab puedes analizar tu carta con IA para recibir feedback profesional.
          </div>
      </section>

    </div>
  );
  
  // --- CONTENIDO ESPECÍFICO PARA EL ARTÍCULO ID 4 (SEGURO MÉDICO - ACTUALIZADO) ---
  const ArticleContentInsurance = () => (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-8">
      {/* 🎯 Intro y Advertencia */}
      <section>
        <h2 className="text-2xl font-bold text-white mb-4">No todos los seguros son válidos</h2>
        <p>Uno de los errores más frecuentes al solicitar una estancia por estudios en España es contratar un seguro médico genérico o el más barato disponible en internet. Aunque pueda parecer suficiente, muchos de estos seguros no cumplen los requisitos exigidos por Extranjería, lo que puede provocar la denegación del expediente.</p>
        
        <div className="bg-yellow-500/10 border-l-4 border-yellow-500 p-5 rounded-r-lg my-6 flex items-start gap-3">
           <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
           <p className="text-yellow-400 font-bold m-0 text-sm md:text-base">En los trámites de extranjería, el seguro médico es un requisito obligatorio, no un simple complemento.</p>
        </div>
      </section>

      {/* Requisitos (Grid) */}
      <section>
         <h2 className="text-2xl font-bold text-white mt-8 mb-6 flex items-center gap-3">
            <ShieldAlert size={24} className="text-indigo-400"/> Requisitos obligatorios del seguro médico según Extranjería
         </h2>
         <p className="mb-6 text-slate-300">Para residir legalmente en España como estudiante extranjero, el seguro médico debe cumplir estrictamente con las siguientes condiciones:</p>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
             {/* Card 1 */}
             <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/30 transition-colors">
                <div className="bg-slate-800/50 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-white font-bold border border-slate-700">1</div>
                <h3 className="text-lg font-bold text-white mb-2">Sin copagos</h3>
                <p className="text-sm text-slate-400 mb-4">La póliza debe cubrir el 100 % de la atención médica, sin que el estudiante tenga que abonar cantidades adicionales por consultas, urgencias, pruebas o tratamientos.</p>
                <div className="bg-red-500/10 text-red-400 text-xs p-2 rounded border border-red-500/20 font-medium">
                   👉 Si incluye copagos, franquicia o deducible, no es válido.
                </div>
             </div>

             {/* Card 2 */}
             <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/30 transition-colors">
                <div className="bg-slate-800/50 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-white font-bold border border-slate-700">2</div>
                <h3 className="text-lg font-bold text-white mb-2">Sin periodos de carencia</h3>
                <p className="text-sm text-slate-400 mb-4">La cobertura debe ser inmediata, desde el primer día de vigencia del seguro. Extranjería no acepta seguros que retrasen la atención médica.</p>
                <div className="bg-red-500/10 text-red-400 text-xs p-2 rounded border border-red-500/20 font-medium">
                   👉 Si el contrato menciona carencias, no cumple el requisito.
                </div>
             </div>

             {/* Card 3 */}
             <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/30 transition-colors">
                <div className="bg-slate-800/50 w-10 h-10 rounded-full flex items-center justify-center mb-3 text-white font-bold border border-slate-700">3</div>
                <h3 className="text-lg font-bold text-white mb-2">Repatriación incluida</h3>
                <p className="text-sm text-slate-400 mb-4">El seguro debe contemplar la repatriación al país de origen, tanto en caso de fallecimiento como de enfermedad grave.</p>
                <div className="bg-indigo-500/10 text-indigo-400 text-xs p-2 rounded border border-indigo-500/20 font-medium">
                   Este punto es obligatorio y debe estar claramente reflejado.
                </div>
             </div>
         </div>
      </section>

      {/* Lo que NO se acepta */}
      <section className="mt-8 bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
             <Ban className="text-red-500" size={24} /> Seguros que Extranjería no acepta
          </h2>
          <p className="mb-4 text-slate-300">Aunque puedan parecer suficientes, los siguientes tipos de seguro <span className="text-red-400 font-bold">no son válidos</span> para trámites de estudiante en España:</p>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <li className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-lg border border-red-500/10">
                <XCircle className="text-red-500 shrink-0" size={18}/>
                <span className="text-slate-300 font-medium">Seguros de viaje</span>
             </li>
             <li className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-lg border border-red-500/10">
                <XCircle className="text-red-500 shrink-0" size={18}/>
                <span className="text-slate-300 font-medium">Seguros con reembolso</span>
             </li>
             <li className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-lg border border-red-500/10">
                <XCircle className="text-red-500 shrink-0" size={18}/>
                <span className="text-slate-300 font-medium">Pólizas con deducible o franquicia</span>
             </li>
             <li className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-lg border border-red-500/10">
                <XCircle className="text-red-500 shrink-0" size={18}/>
                <span className="text-slate-300 font-medium">Seguros temporales tipo turista</span>
             </li>
          </ul>
      </section>

      {/* Oferta VisaGo */}
      <section className="mt-8 bg-gradient-to-r from-indigo-900/40 to-slate-900 border border-indigo-500/30 p-8 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none"></div>
          
          <h2 className="text-2xl font-bold text-white mb-4 relative z-10">El seguro médico que ofrece VisaGo</h2>
          <p className="mb-6 text-slate-300 relative z-10">En VisaGo contamos con un seguro médico diseñado específicamente para estudiantes extranjeros, que cumple con todos los requisitos exigidos por Extranjería:</p>
          
          <ul className="space-y-3 mb-8 relative z-10">
             <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400 shrink-0" size={20}/>
                <span className="text-white font-medium">Sin copagos</span>
             </li>
             <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400 shrink-0" size={20}/>
                <span className="text-white font-medium">Sin periodos de carencia</span>
             </li>
             <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400 shrink-0" size={20}/>
                <span className="text-white font-medium">Con repatriación incluida</span>
             </li>
             <li className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400 shrink-0" size={20}/>
                <span className="text-white font-medium">Válido para solicitudes iniciales y renovaciones</span>
             </li>
          </ul>

          <div className="relative z-10 bg-indigo-500/20 border border-indigo-500/30 p-4 rounded-xl text-center">
              <p className="text-indigo-200 font-bold m-0">Con VisaGo, tu seguro médico no será un motivo de rechazo, sino un punto a favor de tu expediente.</p>
          </div>
      </section>
    </div>
  );

  // --- CONTENIDO ESPECÍFICO PARA EL ARTÍCULO ID 6 (CARTAS DE RECOMENDACIÓN) ---
  const ArticleContentRecommendationLetter = () => (
    <div className="prose prose-invert prose-lg max-w-none text-slate-300 space-y-8">
      
      {/* 🎯 INTRODUCCIÓN */}
      <section>
        <p>Las cartas de recomendación son uno de los documentos más importantes en una solicitud de beca. No solo respaldan tu perfil académico o profesional, sino que aportan una visión externa y objetiva sobre tu potencial, compromiso y méritos. En esta guía te explicamos qué son, quién debe escribirlas, cómo deben estructurarse y qué errores evitar, para que puedas presentarlas correctamente en tu aplicación.</p>
      </section>

      {/* 🤔 QUÉ ES */}
      <section>
        <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-3">
           <FileText size={24} className="text-indigo-400"/> ¿Qué es una carta de recomendación para becas?
        </h2>
        <p className="mb-4">Es un documento formal redactado por una persona con autoridad académica o profesional que avala tus capacidades. Su función principal es reforzar la credibilidad de tu candidatura más allá de notas y certificados.</p>
        
        <div className="bg-slate-800/50 border-l-4 border-indigo-500 p-5 rounded-r-lg my-6">
           <strong className="text-white block mb-2 font-serif italic text-lg">Ejemplo breve:</strong>
           <p className="text-slate-300 italic">"Durante los dos años en los que Juan fue alumno del Grado en Ingeniería bajo mi docencia, participó activamente en el proyecto de optimización de un sistema de gestión energética... asumiendo un rol clave en el análisis de datos..."</p>
        </div>
      </section>

      {/* 👤 QUIÉN DEBE ESCRIBIRLA */}
      <section>
         <h2 className="text-2xl font-bold text-white mt-8 mb-4 flex items-center gap-3">
            <UserCheck size={24} className="text-indigo-400"/> ¿Quién debe escribir la carta?
         </h2>
         <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
             <div className="space-y-3">
                 <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-green-500 mt-1 shrink-0" size={20}/>
                    <span className="text-slate-300">Profesor que te impartió varias asignaturas y conoce tu rendimiento.</span>
                 </div>
                 <div className="flex items-start gap-3">
                    <XCircle className="text-red-500 mt-1 shrink-0" size={20}/>
                    <span className="text-slate-300">Familiar o amigo sin vínculo académico o profesional.</span>
                 </div>
             </div>
         </div>
      </section>

      {/* 📝 ESTRUCTURA CORRECTA */}
      <section>
         <h2 className="text-2xl font-bold text-white mt-8 mb-6 flex items-center gap-3">
             <FileSignature size={24} className="text-indigo-400"/> Estructura correcta de una carta de recomendación
         </h2>
         <div className="space-y-4">
             <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                 <h3 className="text-lg font-bold text-white mb-2">1. Encabezado e Introducción</h3>
                 <p className="text-sm text-slate-400">Lugar, fecha, datos del recomendante y relación con el candidato.</p>
             </div>
             <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                 <h3 className="text-lg font-bold text-white mb-2">2. Cuerpo de la carta</h3>
                 <p className="text-sm text-slate-400">Habilidades, logros concretos y ejemplos reales del desempeño del estudiante.</p>
             </div>
             <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                 <h3 className="text-lg font-bold text-white mb-2">3. Cierre</h3>
                 <p className="text-sm text-slate-400">Recomendación explícita, disponibilidad de contacto y firma.</p>
             </div>
         </div>
      </section>
    </div>
  );

  
  return (
    <div className="max-w-3xl mx-auto animate-fade-in pb-12">
      <Link to="/blog" className="text-slate-400 hover:text-white mb-8 inline-flex items-center gap-2 transition-colors">
        <ArrowLeft size={18}/> Volver a Academy
      </Link>
      
      <div className="mb-8">
         <span className={`px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide border mb-4 inline-block ${
             article.category === 'Guías' 
             ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' 
             : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
         }`}>
             {article.category}
         </span>
         <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{article.title}</h1>
         <div className="flex items-center gap-4 text-slate-400 text-sm border-b border-slate-800 pb-8">
             <span className="flex items-center gap-2"><Clock size={16}/> {article.readTime} de lectura</span>
             <span>•</span>
             <span>Actualizado recientemente</span>
         </div>
      </div>

      <div className="w-full h-80 rounded-3xl overflow-hidden mb-10 border border-slate-800">
         <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Renderizado Condicional del Contenido */}
      {article.id === 1 ? (
        <ArticleContentCV />
      ) : article.id === 2 ? (
        <ArticleContentLowGpa />
      ) : article.id === 5 ? (
        <ArticleContentMotivationLetter />
      ) : article.id === 4 ? (
        <ArticleContentInsurance />
      ) : article.id === 6 ? (
        <ArticleContentRecommendationLetter />
      ) : (
        <div className="prose prose-invert prose-lg max-w-none text-slate-300">
           <p className="lead text-xl text-slate-200 mb-6 font-medium">{article.description}</p>
           <div className="bg-slate-900/50 p-12 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center gap-4">
              <FileText size={48} className="text-slate-600"/>
              <div>
                  <h3 className="text-white font-bold text-lg">Contenido en preparación</h3>
                  <p className="text-slate-500 italic">El equipo editorial está finalizando este artículo. Vuelve pronto.</p>
              </div>
           </div>
        </div>
      )}

    </div>
  );
};

export const AdminToolsView = () => <div className="text-white p-4 bg-slate-900 rounded-xl border border-slate-800">Panel de Administración (Solo lectura)</div>;
export const ProfileView = () => <div className="text-white p-4 bg-slate-900 rounded-xl border border-slate-800">Perfil del Usuario</div>;