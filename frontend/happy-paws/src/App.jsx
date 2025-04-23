import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPages from "./pages/inventory-pages";
import RegisterPage from "./pages/register-page";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<InventoryPages/>} />
        <Route path="/register" element={<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;