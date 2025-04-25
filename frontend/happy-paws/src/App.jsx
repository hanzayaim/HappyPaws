import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterOwner from "./pages/register-owner";
import RegisterPage from "./pages/register-page";
import RegisterEmployee from "./pages/register-employee";
import LoginPage from "./pages/login-page";
import AnimalDetail from "./pages/animal-detail";
import { AnimalManagement } from "./pages/animal-management";
import InventoryPages from "./pages/inventory-pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/register-owner" element={<RegisterOwner />} />
        <Route
          path="/register/register-employee"
          element={<RegisterEmployee />}
        />
        <Route path="/animal-management" element={<AnimalManagement />} />
        <Route
          path="/animal-management/animal-detail/:id"
          element={<AnimalDetail />}
        />
        <Route path="/inventory-management" element={<InventoryPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
