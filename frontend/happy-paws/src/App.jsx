import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterOwner from "./pages/register-owner";
import RegisterPage from "./pages/register-page";
import RegisterEmployee from "./pages/register-employee";
import LoginPage from "./pages/login-page";
import AnimalManagement from "./pages/animal-management";

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

      </Routes>
    </BrowserRouter>
  );
}

export default App;