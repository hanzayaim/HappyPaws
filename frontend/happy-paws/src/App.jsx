import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterOwner from "./pages/register-owner";
import RegisterPage from "./pages/register-page";
import RegisterEmployee from "./pages/register-employee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/register-owner" element={<RegisterOwner />} />
        <Route
          path="/register/register-employee"
          element={<RegisterEmployee />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
