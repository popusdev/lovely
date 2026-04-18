import { Navigate } from "react-router-dom";
import { useStore } from "./store";

function ProtectedRoute({ children }) {
  const { user, loading } = useStore();

  if (loading) {
    return <div>loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;