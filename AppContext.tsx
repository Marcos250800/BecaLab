import React, { useState, useEffect, createContext, useContext } from 'react';
import { scholarships as SCHOLARSHIPS_DB, Scholarship } from './data/scholarships';

// Re-export Scholarship so it can be used by other components
export type { Scholarship };

// --- Types & Interfaces ---

export interface Article {
  id: number;
  title: string;
  description: string;
  category: 'Guías' | 'Documentación';
  readTime: string;
  imageUrl: string;
}

export interface UserProfile {
  name: string;
  email: string;
  educationLevel: string;
  isAdmin?: boolean;
  marketingConsent?: boolean;
}

interface AppContextType {
  scholarships: Scholarship[];
  addScholarships: (newScholarships: Scholarship[]) => void;
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  usersDatabase: UserProfile[];
  savedScholarships: number[];
  login: (email: string, name: string) => void;
  logout: () => void;
  updateUser: (user: UserProfile) => void;
  setMarketingConsent: (consent: boolean) => void;
  toggleSaveScholarship: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// --- Constants & Data ---
export const ADMIN_EMAIL = "visagonline@gmail.com";

export const COUNTRIES = [
  "Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica", 
  "Cuba", "Ecuador", "El Salvador", "España", "Guatemala", "Honduras", 
  "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "República Dominicana", 
  "Uruguay", "Venezuela", "Estados Unidos", "Otro"
];

// --- NUEVOS DATOS DE ARTÍCULOS ---
export const ARTICLES_DATA: Article[] = [
  { 
    id: 1, 
    category: 'Guías',
    title: "Por qué tu CV es la llave maestra para conseguir becas", 
    description: "Tu currículum tiene solo 30 segundos para causar impacto. Descubre cómo convertirlo en tu mejor herramienta para conseguir becas internacionales.",
    readTime: "6 min",
    imageUrl: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2070&auto=format&fit=crop"
  },
  { 
    id: 2, 
    category: 'Guías',
    title: "¿Promedio bajo? Cómo ganar la beca aunque no seas un alumno de 10", 
    description: "No necesitas ser un alumno de 10 para ganar una beca. Aprende a compensar tu expediente con experiencia real y liderazgo.",
    readTime: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop"
  },
  { 
    id: 3, 
    category: 'Documentación',
    title: "Antecedentes Penales: El papel que caduca antes de que te des cuenta", 
    description: "Los antecedentes penales caducan rápido. Conoce los plazos exactos para no perder tu visa por un error de timing.",
    readTime: "4 min",
    imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2000&auto=format&fit=crop"
  },
  { 
    id: 4, 
    category: 'Documentación',
    title: "Seguro médico para estudiantes extranjeros en España", 
    description: "Descubre los requisitos exactos que Extranjería exige para el seguro médico de estudiantes extranjeros en España y evita rechazos.",
    readTime: "7 min",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop"
  },
  { 
    id: 5, 
    category: 'Guías',
    title: "¿Cómo hacer una Carta de Motivación?", 
    description: "Aprende paso a paso cómo escribir una carta de motivación que destaque entre miles de candidatos y te ayude a conseguir tu beca internacional.",
    readTime: "8 min",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2000&auto=format&fit=crop"
  },
  { 
    id: 6, 
    category: 'Guías',
    title: "Cartas de Recomendación para Becas: Guía Clara y Profesional", 
    description: "La carta de recomendación perfecta no viene de quien tiene el cargo más alto, sino de quien te conoce mejor. Aprende a elegir correctamente.",
    readTime: "5 min",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
  }
];

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  // Carga inicial desde la "Base de Datos" centralizada
  const [scholarships, setScholarships] = useState<Scholarship[]>(SCHOLARSHIPS_DB);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [usersDatabase, setUsersDatabase] = useState<UserProfile[]>([]);
  const [savedScholarships, setSavedScholarships] = useState<number[]>([]);

  useEffect(() => {
    // Usuario admin por defecto
    setUsersDatabase([{
      name: "Administrador Visag",
      email: ADMIN_EMAIL,
      educationLevel: "Máster",
      isAdmin: true
    }]);
  }, []);

  const login = (email: string, name: string) => {
    let user = usersDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      // Registrar nuevo usuario simulado
      user = {
        name,
        email,
        educationLevel: "Estudiante",
        isAdmin: email === ADMIN_EMAIL
      };
      setUsersDatabase(prev => [...prev, user!]);
    }
    
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const addScholarships = (newScholarships: Scholarship[]) => {
    const currentIds = new Set(scholarships.map(s => s.id));
    const toAdd = newScholarships.filter(s => !currentIds.has(s.id));
    if (toAdd.length > 0) {
      setScholarships(prev => [...prev, ...toAdd]);
    }
  };

  const updateUser = (updatedUser: UserProfile) => {
    setCurrentUser(updatedUser);
    setUsersDatabase(prev => prev.map(u => u.email === updatedUser.email ? updatedUser : u));
  };

  const setMarketingConsent = (consent: boolean) => {
    if (currentUser) {
      const updated = { ...currentUser, marketingConsent: consent };
      updateUser(updated);
    }
  };

  const toggleSaveScholarship = (id: number) => {
    setSavedScholarships(prev => {
      if (prev.includes(id)) {
        return prev.filter(savedId => savedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <AppContext.Provider value={{ 
      scholarships, 
      addScholarships, 
      currentUser, 
      updateUser, 
      isAuthenticated, 
      login, 
      logout, 
      usersDatabase,
      savedScholarships,
      setMarketingConsent,
      toggleSaveScholarship
    }}>
      {children}
    </AppContext.Provider>
  );
};