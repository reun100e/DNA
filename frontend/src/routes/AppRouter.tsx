import { Routes, Route} from 'react-router-dom';
import NotFound from '../pages/NotFound';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { VerifyPage } from '../pages/VerifyPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PaymentPage } from '../pages/PaymentPage';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/payment" element={<PaymentPage />} />

      {/* Private Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFound />} /> {/* Handle 404s */}
    </Routes>
);
