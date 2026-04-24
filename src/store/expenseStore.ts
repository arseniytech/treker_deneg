import { create } from 'zustand';

export type Expense = {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: string;
};

type ExpenseStore = {
  expenses: Expense[];
  filter: string;
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: number) => void;
  setFilter: (filter: string) => void;
};

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: [
    { id: 1, amount: 850,  category: 'Еда',         description: 'Пятёрочка', date: '2025-04-15' },
    { id: 2, amount: 120,  category: 'Транспорт',   description: 'Метро',     date: '2025-04-16' },
    { id: 3, amount: 600,  category: 'Развлечения', description: 'Кино',      date: '2025-04-17' },
  ],
  filter: 'Все',
  addExpense: (expense) => set({ expenses: [{ ...expense, id: Date.now() }, ...get().expenses] }),
  deleteExpense: (id) => set({ expenses: get().expenses.filter(e => e.id !== id) }),
  setFilter: (filter) => set({ filter }),
}));

export const CATEGORIES = ['Еда', 'Транспорт', 'Развлечения', 'Здоровье', 'Одежда', 'Прочее'];

export const CATEGORY_COLORS: Record<string, { background: string; color: string }> = {
  'Еда':         { background: '#e6f7f0', color: '#00a67d' },
  'Транспорт':   { background: '#e6f0ff', color: '#0974d0' },
  'Развлечения': { background: '#fde8ec', color: '#D22145' },
  'Здоровье':    { background: '#fce4ec', color: '#d6336c' },
  'Одежда':      { background: '#ede7f6', color: '#6c5ce7' },
  'Прочее':      { background: '#f0f0f0', color: '#636e72' },
};