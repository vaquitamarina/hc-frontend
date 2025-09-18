import { Outlet } from 'react-router';
import Header from '../../components/layout/Header/Header';
import './AuthLayout.css';

function AuthLayout() {
  return (
    <>
      <Header />
      <div className="auth-layout">
        <div className="auth-layout__container">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
