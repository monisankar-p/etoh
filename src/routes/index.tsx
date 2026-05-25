import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import AuthPage from '../pages/AuthPage';
import PatientLayout from '../layouts/PatientLayout';
import PatientDashboard from '../pages/patient/PatientDashboard';


const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/auth" replace />;
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />; // Or an unauthorized page
  }

  return <>{children}</>;
};

const RootRoute = () => {
  const { isAuthenticated, role } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  switch (role) {
    case 'patient': return <Navigate to="/patient" replace />;
    case 'doctor': return <Navigate to="/doctor" replace />;
    case 'nurse': return <Navigate to="/nurse" replace />;
    case 'admin': return <Navigate to="/admin" replace />;
    case 'executive': return <Navigate to="/executive" replace />;
    default: return <Navigate to="/auth" replace />;
  }
};

import ReportIntelligence from '../pages/patient/ReportIntelligence';
import Prescriptions from '../pages/patient/Prescriptions';
import HomeVitals from '../pages/patient/HomeVitals';
import HealthTimeline from '../pages/patient/HealthTimeline';
import Genetics from '../pages/patient/Genetics';
import Triage from '../pages/patient/Triage';
import TestsImaging from '../pages/patient/TestsImaging';
import Billing from '../pages/patient/Billing';
import Settings from '../pages/Settings';

import DoctorLayout from '../layouts/DoctorLayout';
import DoctorDashboard from '../pages/doctor/DoctorDashboard';
import NurseLayout from '../layouts/NurseLayout';
import NurseDashboard from '../pages/nurse/NurseDashboard';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ExecutiveLayout from '../layouts/ExecutiveLayout';
import ExecutiveDashboard from '../pages/executive/ExecutiveDashboard';
import AssistedRegistration from '../pages/executive/AssistedRegistration';
import IdentityVerification from '../pages/executive/IdentityVerification';

import Consultations from '../pages/doctor/Consultations';
import SoapNotes from '../pages/doctor/SoapNotes';
import DoctorAnalytics from '../pages/doctor/DoctorAnalytics';
import ResidentAssistant from '../pages/doctor/ResidentAssistant';
import DrugInteractions from '../pages/doctor/DrugInteractions';
import Community from '../pages/doctor/Community';
import Network from '../pages/doctor/Network';
import RoicDashboard from '../pages/doctor/RoicDashboard';

import NurseMedications from '../pages/nurse/NurseMedications';
import NurseVitals from '../pages/nurse/NurseVitals';
import NurseTasks from '../pages/nurse/NurseTasks';
import CareTimeline from '../pages/nurse/CareTimeline';
import SkillDevelopment from '../pages/nurse/SkillDevelopment';

import AdminBeds from '../pages/admin/AdminBeds';
import AdminStaff from '../pages/admin/AdminStaff';
import AdminAnalytics from '../pages/admin/AdminAnalytics';
import DischargeForecasting from '../pages/admin/DischargeForecasting';
import QualityMonitoring from '../pages/admin/QualityMonitoring';
import GapAnalysis from '../pages/admin/GapAnalysis';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />
  },
  {
    path: '/auth',
    element: <AuthPage />
  },

  {
    path: '/patient',
    element: (
      <ProtectedRoute allowedRoles={['patient']}>
        <PatientLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <PatientDashboard /> },
      { path: 'reports', element: <ReportIntelligence /> },
      { path: 'prescriptions', element: <Prescriptions /> },
      { path: 'vitals', element: <HomeVitals /> },
      { path: 'timeline', element: <HealthTimeline /> },
      { path: 'genetics', element: <Genetics /> },
      { path: 'triage', element: <Triage /> },
      { path: 'tests', element: <TestsImaging /> },
      { path: 'billing', element: <Billing /> },
      { path: 'settings', element: <Settings /> },
    ]
  },
  {
    path: '/doctor',
    element: (
      <ProtectedRoute allowedRoles={['doctor']}>
        <DoctorLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DoctorDashboard /> },
      { path: 'roic', element: <RoicDashboard /> },
      { path: 'consultations', element: <Consultations /> },
      { path: 'notes', element: <SoapNotes /> },
      { path: 'analytics', element: <DoctorAnalytics /> },
      { path: 'resident', element: <ResidentAssistant /> },
      { path: 'interactions', element: <DrugInteractions /> },
      { path: 'community', element: <Community /> },
      { path: 'network', element: <Network /> },
      { path: 'settings', element: <Settings /> },
    ]
  },
  {
    path: '/nurse',
    element: (
      <ProtectedRoute allowedRoles={['nurse']}>
        <NurseLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <NurseDashboard /> },
      { path: 'medications', element: <NurseMedications /> },
      { path: 'vitals', element: <NurseVitals /> },
      { path: 'tasks', element: <NurseTasks /> },
      { path: 'timeline', element: <CareTimeline /> },
      { path: 'skills', element: <SkillDevelopment /> },
      { path: 'settings', element: <Settings /> },
    ]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'beds', element: <AdminBeds /> },
      { path: 'staff', element: <AdminStaff /> },
      { path: 'analytics', element: <AdminAnalytics /> },
      { path: 'forecasting', element: <DischargeForecasting /> },
      { path: 'quality', element: <QualityMonitoring /> },
      { path: 'gap', element: <GapAnalysis /> },
      { path: 'settings', element: <Settings /> },
    ]
  },
  {
    path: '/executive',
    element: (
      <ProtectedRoute allowedRoles={['executive']}>
        <ExecutiveLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ExecutiveDashboard /> },
      { path: 'registration', element: <AssistedRegistration /> },
      { path: 'verification', element: <IdentityVerification /> },
      { path: 'settings', element: <Settings /> },
    ]
  }
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
