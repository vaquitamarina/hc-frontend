import { Outlet } from 'react-router';
import Header from '@cmlayout/Header/Header';
import './StudentLayout.css';

function StudentLayout() {
  return (
    <div className="student-layout">
      <Header />
      <main>
        <div className="student-layout__content">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
}

export default StudentLayout;
