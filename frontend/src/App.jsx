import { Navigate, BrowserRouter as Router, useRoutes } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

function AppRoutes() {
  let routes = useRoutes([
    { path: "/", element: <Navigate to="/login" replace /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
  ]);

  return routes;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
