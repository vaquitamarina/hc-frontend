import { Outlet } from 'react-router';
import Header from '@cmlayout/Header/Header';
import './AuthLayout.css';

function AuthLayout() {
  return (
    <div className="authlayout">
      <Header />
      <div className="authlayout__content">
        <div className="authlayout__login">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
