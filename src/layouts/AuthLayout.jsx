import { Outlet } from 'react-router';
import Header from '@cmlayout/Header';

function AuthLayout() {
  return (
    <div className="flex flex-col h-screen relative">
      <Header />
      <div
        className="flex justify-center items-center h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hc-frontend/fondo.webp')" }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-[1]" />

        {/* Contenedor del login */}
        <div className="bg-white p-14 rounded-lg z-[2]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
