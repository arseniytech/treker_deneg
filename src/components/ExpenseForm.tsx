import { useExpenseForm } from '../hooks/useExpense';
import { CATEGORIES } from '../store/expenseStore';
import styles from './ExpenseForm.module.css';

export const ExpenseForm = () => {
  const { amount, setAmount, category, setCategory, description, setDescription, date, setDate, handleSubmit } = useExpenseForm();

  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>Добавить расход</div>
      <div className={styles.formGrid}>
        <div className={styles.field}>
          <label>Сумма (₽)</label>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Категория</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label>Описание</label>
          <input
            type="text"
            placeholder="На что?"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label>Дата</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <button className={styles.btn} onClick={handleSubmit}>
          + Добавить
        </button>
      </div>
    </div>
  );
};