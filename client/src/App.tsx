import "./styles/index.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PublicRoute from "./api/PublicRoute";
import PrivateRoute from "./api/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ChatApp from "./components/chat/ChatApp";
import { ChatProvider } from "./context/ChatContext";
// import { useEffect } from "react";
// import { blue, red } from "./messageLogger";
export default function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ChatApp />
                </PrivateRoute>
              }
            />
            <Route
              path="/m/:id"
              element={
                <PrivateRoute>
                  <ChatApp />
                </PrivateRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />
          </Routes>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}
