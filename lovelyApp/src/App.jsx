import { Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard"
import ProtectedRoute from "./services/ProtectedRoute";
import InvitePage from "./components/InvitePage"
import Connection from "./components/Connection"
import CreateConnection from "./components/CreateConnection";

function App() {

  return (
    <>
      <Routes>
        <Route
        path="/"
        element={<Auth />} />

        <Route
        path="/invite/:token"
        element={<InvitePage />} />

        <Route
          path="createconnection"
          element={
            <ProtectedRoute>
              <CreateConnection />
            </ProtectedRoute>
          } />

        <Route
        path="/connection/:id"
        element={
          <ProtectedRoute>
            <Connection />
          </ProtectedRoute>
        } />

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
