import { useEffect } from 'react';
import AuthService from '../services/AuthService';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  useEffect(() => {
    const initLogin = async () => {
      try {
        const success = await AuthService.login();
        if (success) {
          onLoginSuccess();
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    };

    initLogin();
  }, [onLoginSuccess]);

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1491466424936-e304919aada7?q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        backgroundBlendMode: 'darken'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card bg-dark bg-opacity-25 text-white" style={{ backdropFilter: 'blur(8px)' }}>
              <div className="card-body p-4">
                <h2 className="text-center mb-4 fw-semibold">Redirecting to login...</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 