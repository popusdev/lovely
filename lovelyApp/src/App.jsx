import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./services/ProtectedRoute";

function App() {

  return (
    <>
      <Routes>
        <Route
        path="/"
        element={<Auth />} />

        <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
