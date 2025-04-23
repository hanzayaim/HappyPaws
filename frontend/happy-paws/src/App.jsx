import { Button } from "@/components/ui/button"
import AnimalManagement from "./pages/animal-management"
import AnimalDetail from "./pages/animal-detail"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <AnimalDetail></AnimalDetail>
    </div>
  )
}

export default App
