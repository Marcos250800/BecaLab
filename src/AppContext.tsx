import React, { useState, useEffect, createContext, useContext } from 'react';

// --- Types & Interfaces ---
export interface Scholarship {
  id: number;
  title: string;
  entity: string; // Renombrado de organization para estandarizar
  description: string;
  amount: string;
  deadline: string;
  status: 'Abierta' | 'Cerrada'; // Estandarizado a español
  type: string;
  probability: 'Alta' | 'Media' | 'Baja'; // Renombrado de visaProbability
  link: string;
  isNew?: boolean;
}

export interface Article {
  id: number;
  title: string;
  readTime: string;
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

export const ARTICLES_DATA: Article[] = [
  { id: 1, title: "Por qué tu CV es la llave maestra para conseguir becas", readTime: "6 min" },
  { id: 2, title: "Carta de Motivación: Errores que te descartan", readTime: "4 min" },
  { id: 3, title: "Entrevista consular: Cómo asegurar tu Visa", readTime: "8 min" }
];

// --- DATOS CENTRALIZADOS DE BECAS (11 ITEMS) ---
const INITIAL_SCHOLARSHIPS_DATA: Scholarship[] = [
  {
    id: 1,
    title: "Becas La Caixa (Doctorado INPhINIT)",
    entity: "Fundación La Caixa",
    description: "Probablemente la beca mejor pagada de España. Dirigida a investigadores de excelencia (STEM y otros campos) para cursar doctorados en centros acreditados.",
    type: "Doctorado",
    status: "Abierta",
    deadline: "31 Ene 2026",
    amount: "35.800€ anuales + Investigación",
    link: "https://fundacionlacaixa.org/es/becas-doctorado-inphinit-convocatoria-incoming",
    probability: "Alta",
    isNew: true
  },
  {
    id: 2,
    title: "Becas Santander (Ayuda de Movilidad)",
    entity: "Banco Santander",
    description: "El Banco Santander ofrece miles de becas cada año. No suelen cubrir todo el máster, pero dan ayudas significativas para movilidad.",
    type: "Grado/Máster",
    status: "Abierta",
    deadline: "15 Abr 2026",
    amount: "1.000€ - 3.000€ pago único",
    link: "https://app.santanderopenacademy.com/es/",
    probability: "Media"
  },
  {
    id: 3,
    title: "Erasmus Mundus Joint Masters",
    entity: "Comisión Europea",
    description: "El sueño europeo. Estudias el máster en 2 o 3 países diferentes de la UE (ej: 6 meses en España, 6 en Francia).",
    type: "Máster",
    status: "Abierta",
    deadline: "15 Feb 2026",
    amount: "Matrícula completa + Viajes + 1.400€/mes",
    link: "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en",
    probability: "Alta"
  },
  {
    id: 4,
    title: "Becas Atracción del Talento",
    entity: "Universidad de Jaén (UJA)",
    description: "¡Oportunidad de ORO! Cubre el 100% de la matrícula + Seguro médico + Cursos de español gratis.",
    type: "Máster",
    status: "Abierta",
    deadline: "15 Feb 2026",
    amount: "100% Matrícula + 3.190€ + Seguro",
    link: "https://www.ujaen.es/internacional/convocatorias-internacionales",
    probability: "Alta",
    isNew: true
  },
  {
    id: 5,
    title: "Becas Iberoamérica + Asia",
    entity: "Universidad de Valladolid (UVa)",
    description: "Una de las mejores para Máster. Cubre el 80% de la matrícula, seguro médico y una mensualidad de 750€. Muy popular entre ingenieros.",
    type: "Máster",
    status: "Cerrada",
    deadline: "Varía",
    amount: "80% Matrícula + 750€/mes",
    link: "https://iberoamerica-asia.uva.es",
    probability: "Alta"
  },
  {
    id: 6,
    title: "Becas BEME (Excelencia Exterior)",
    entity: "Xunta de Galicia",
    description: "¿Tienes abuelos o padres gallegos? Esta beca es para ti. Financia másteres en Galicia con una dotación generosa para manutención.",
    type: "Máster",
    status: "Cerrada",
    deadline: "Abril 2026",
    amount: "7.000€ - 11.500€",
    link: "https://emigracion.xunta.gal/es/becas-excelencia-juventud-exterior",
    probability: "Alta"
  },
  {
    id: 7,
    title: "Becas AUIP (Másteres Andalucía)",
    entity: "AUIP",
    description: "Becas para cursar másteres oficiales en universidades andaluzas (Sevilla, Granada, Málaga, etc.). Cubre matrícula y a veces ayuda de viaje.",
    type: "Máster",
    status: "Cerrada",
    deadline: "Enero 2026",
    amount: "Matrícula completa + Viaje",
    link: "https://www.auip.org/es/becas-auip",
    probability: "Media"
  },
  {
    id: 8,
    title: "Becas Internacionales USAL",
    entity: "Universidad de Salamanca",
    description: "Dirigidas específicamente a estudiantes latinoamericanos de doctorado y máster. Incluye seguro médico y alojamiento.",
    type: "Máster/Doctorado",
    status: "Cerrada",
    deadline: "Marzo 2026",
    amount: "Seguro médico + Alojamiento",
    link: "https://rel-int.usal.es/es/proyectos/becas-internacionales-de-la-usal",
    probability: "Media"
  },
  {
    id: 9,
    title: "Becas Fundación Carolina",
    entity: "Fundación Carolina",
    description: "Programa de becas de posgrado para ciudadanos latinoamericanos. Cubre alojamiento y manutención parcial. Muy competitivas.",
    type: "Postgrado",
    status: "Cerrada",
    deadline: "Marzo 2026",
    amount: "Manutención parcial + Alojamiento",
    link: "https://www.fundacioncarolina.es/formacion/solicitud-de-becas/",
    probability: "Media"
  },
  {
    id: 10,
    title: "Becas MAEC-AECID",
    entity: "Gobierno de España",
    description: "Becas del Gobierno de España para estudios de máster en instituciones españolas. Dotación completa mensual, matrícula y seguro.",
    type: "Máster/Arte",
    status: "Cerrada",
    deadline: "Febrero 2026",
    amount: "Mensualidad + Matrícula + Seguro",
    link: "https://www.aecid.es/becas-y-lectorados",
    probability: "Alta"
  },
  {
    id: 11,
    title: "Ramón y Cajal (Investigación)",
    entity: "Ministerio de Ciencia",
    description: "Contratos de investigación de 5 años para doctores con trayectoria investigadora destacada. Estabilización en el sistema español.",
    type: "Doctorado/Postdoc",
    status: "Cerrada",
    deadline: "Enero 2026",
    amount: "Contrato 40.000€/año",
    link: "https://www.aei.gob.es/convocatorias/buscador-convocatorias",
    probability: "Baja"
  }
];

export const AppProvider = ({ children }: { children?: React.ReactNode }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>(INITIAL_SCHOLARSHIPS_DATA);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [usersDatabase, setUsersDatabase] = useState<UserProfile[]>([]);
  const [savedScholarships, setSavedScholarships] = useState<number[]>([]);

  useEffect(() => {
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
    if (toAdd.length > 0) setScholarships(prev => [...prev, ...toAdd]);
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