import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import RegisterOwner from "./pages/register-owner";
import RegisterPage from "./pages/register-page";
import RegisterEmployee from "./pages/register-employee";
import LoginPage from "./pages/login-page";
import InventoryPages from "./pages/inventory-pages";
import ShelterManagementPages from "./pages/shelter-management-pages";
import AnimalManagement from "./pages/animal-management";
import AdopterManagement from "./pages/adopter-management";
import AnimalDetail from "./pages/animal-detail";
import MedicalManagement from "./pages/medical-management";
import FinancePage from "./pages/finance-management";
import ForgotPassword from "./pages/forgot-password";
import ForgotPasswordLink from "./pages/forgot-password-link";
import Dashboard from "./pages/dashboard-pages";
import DataConvert from "./pages/data-convert";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/register-owner" element={<RegisterOwner />} />
        <Route
          path="/register/register-employee"
          element={<RegisterEmployee />}
        />
        <Route
          path="/shelter-management"
          element={<ShelterManagementPages />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/register-owner" element={<RegisterOwner />} />
        <Route
          path="/register/register-employee"
          element={<RegisterEmployee />}
        />
        <Route path="/animal-management" element={<AnimalManagement />} />
        <Route path="/adopter-management" element={<AdopterManagement />} />
        <Route
          path="/animal-management/animal-detail/:id_animal"
          element={<AnimalDetail />}
        />
        <Route path="/inventory-management" element={<InventoryPages />} />
        <Route path="/medical-management" element={<MedicalManagement />} />
        <Route path="/data-convert" element={<DataConvert />} />
        <Route path="/finance-management" element={<FinancePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-link" element={<ForgotPasswordLink />} />
        <Route path="/data-convert" element={<DataConvert />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
