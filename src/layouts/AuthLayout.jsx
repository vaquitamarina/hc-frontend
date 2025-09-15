import { Outlet } from 'react-router';
import './AuthLayout.css';

function AuthLayout() {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
