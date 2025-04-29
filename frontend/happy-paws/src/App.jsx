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
        <Route path="/inventory" element={<InventoryPages />} />
      </Routes>
    </Router>
  );
}

export default App;
