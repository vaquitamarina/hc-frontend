import { Outlet } from 'react-router';
import Header from '../../components/layout/Header/Header';
import './AuthLayout.css';

function AuthLayout() {
  return (
    <div className="authlayout">
      <Header />
      <div className="authlayout__login">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
