import { useExpenseStore } from '../store/expenseStore';
import styles from './Stats.module.css';

export const Stats = () => {
  const expenses = useExpenseStore(s => s.expenses);

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const thisMonth = expenses
    .filter(e => e.date.startsWith('2025-04'))
    .reduce((sum, e) => sum + e.amount, 0);
  const categoriesCount = new Set(expenses.map(e => e.category)).size;

  return (
    <div className={styles.statsRow}>
      <div className={styles.statCard}>
        <div className={styles.statLabel}>Всего потрачено</div>
        <div className={`${styles.statValue} ${styles.red}`}>{total.toLocaleString('ru')} ₽</div>
        <div className={styles.statSub}>{expenses.length} записей</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statLabel}>В этом месяце</div>
        <div className={styles.statValue}>{thisMonth.toLocaleString('ru')} ₽</div>
        <div className={styles.statSub}>Апрель 2025</div>
      </div>
      <div className={styles.statCard}>
        <div className={styles.statLabel}>Категорий</div>
        <div className={styles.statValue}>{categoriesCount}</div>
        <div className={styles.statSub}>Активных</div>
      </div>
    </div>
  );
};