import { BrowserRouter } from "react-router"
import AppRoutes from "./routes/AppRoutes"
import { Menu } from "./components/Menu"

function App() {

  return (
    <BrowserRouter>
      <Menu />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
