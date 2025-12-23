import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './AppContext';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import MisPostulaciones from './pages/MisPostulaciones';
import { 
  LoginView, 
  ScholarshipsView, 
  ScholarshipDetailView, 
  BlogView, 
  ArticleDetailView, 
  AdminToolsView, 
  ProfileView 
} from './components/LegacyViews';

// Componente Wrapper para proteger rutas
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const { isAuthenticated } = useAppContext();
  if (!isAuthenticated) {
    return <LoginView />;
  }
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Rutas Públicas/Login */}
      <Route path="/login" element={<LoginView />} />

      {/* Rutas Protegidas dentro del Dashboard Layout */}
      <Route path="/" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardHome />} />
        <Route path="mis-postulaciones" element={<MisPostulaciones />} />
        <Route path="scholarships" element={<ScholarshipsView />} />
        <Route path="scholarships/:id" element={<ScholarshipDetailView />} />
        <Route path="blog" element={<BlogView />} />
        <Route path="blog/:id" element={<ArticleDetailView />} />
        <Route path="admin-tools" element={<AdminToolsView />} />
        <Route path="profile" element={<ProfileView />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AppProvider>
  );
}