import { useState } from 'react';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const [page, setPage] = useState('main');

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <div className={styles.logoMark}>₽</div>
        <div className={styles.sidebarTitle}>Мои расходы</div>
        <div className={styles.sidebarSub}>Личный бюджет</div>
      </div>

      <div
        className={`${styles.navItem} ${page === 'main' ? styles.active : ''}`}
        onClick={() => setPage('main')}
      >
        Главная
      </div>
      <div
        className={`${styles.navItem} ${page === 'add' ? styles.active : ''}`}
        onClick={() => setPage('add')}
      >
        + Добавить расход
      </div>
      <div
        className={`${styles.navItem} ${page === 'cat' ? styles.active : ''}`}
        onClick={() => setPage('cat')}
      >
        Категории
      </div>

      <div className={styles.sidebarBottom}>
        <div className={styles.userAvatar}>?</div>
        <div className={styles.userName}>?</div>
      </div>
    </div>
  );
};