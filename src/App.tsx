import { Sidebar } from './components/Sidebar';
import { Stats } from './components/Stats';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import './App.css';

function App() {
  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  });

  return (
    <>
      <Sidebar />
      <div className="main">
        <div className="topbar">
          <span className="topbarTitle">Обзор расходов</span>
          <span className="topbarDate">{today}</span>
        </div>
        <div className="content">
          <Stats />
          <ExpenseForm />
          <ExpenseList />
        </div>
      </div>
    </>
  );
}

export default App;