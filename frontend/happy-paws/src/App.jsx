import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InventoryPages from "./pages/inventory-pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/food" element={<InventoryPages/>} />
      </Routes>
    </Router>
  );
}

export default App;