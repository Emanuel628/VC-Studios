import { Navigate, Route, Routes } from 'react-router';
import { LandingPage } from '../pages/LandingPage';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { AccountPage } from '../pages/account/AccountPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { DashboardPage } from '../pages/dashboard/DashboardPage';
import { LearningPathsPage } from '../pages/learning-paths/LearningPathsPage';
import { PrivacyPage } from '../pages/legal/PrivacyPage';
import { TermsPage } from '../pages/legal/TermsPage';
import { ResourcesPage } from '../pages/resources/ResourcesPage';
import { RoadmapPage } from '../pages/roadmap/RoadmapPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning-paths"
        element={
          <ProtectedRoute>
            <LearningPathsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/roadmap"
        element={
          <ProtectedRoute>
            <RoadmapPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <ResourcesPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
