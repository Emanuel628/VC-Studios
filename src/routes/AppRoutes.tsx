import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
