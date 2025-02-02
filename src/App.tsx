import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AuthService from './services/AuthService';
import { TransactionService } from './services/TransactionService'; // Import the TransactionService
import ChatUI from './components/ChatUIComponent';
import Login from './components/Login';
import Transactions from './components/TransactionsComponent';
import NavBar from './components/NavBarComponent';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Create an instance of TransactionService
  const transactionService = new TransactionService();

  useEffect(() => {
    setIsAuthenticated(AuthService.isLoggedIn());
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    AuthService.logout(); // Assuming you have a logout method in your AuthService
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <div className="d-flex">
        {/* Pass handleLogout function to NavBar */}
        <NavBar onLogout={handleLogout} /> 
        <div className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/chat-ui" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/chat-ui" />
                ) : (
                  <Login onLoginSuccess={handleLogin} />
                )
              }
            />
            <Route
              path="/transactions"
              element={
                <ProtectedRoute>
                  <Transactions />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat-ui"
              element={
                <ProtectedRoute>
                  <ChatUI transactionService={transactionService} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
