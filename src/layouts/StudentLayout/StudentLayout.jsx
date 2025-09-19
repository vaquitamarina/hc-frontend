import Header from '../../components/layout/Header/Header';
import './StudentLayout.css';

function StudentLayout() {
  return (
    <div className="student-layout">
      <Header />
      <main>
        <div className="student-layout__content">
          <h1>Student Layout</h1>
        </div>
      </main>
    </div>
  );
}

export default StudentLayout;
