import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterOwner from "./pages/register-owner";
import RegisterPage from "./pages/register-page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/registrasi-owner" element={<RegisterOwner />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
