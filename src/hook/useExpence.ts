import { useState } from 'react';
import { useExpenseStore, CATEGORIES } from '../store/expenseStore';

export const useExpenseForm = () => {
  const addExpense = useExpenseStore(s => s.addExpense);

  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (!amount || !date) return;
    addExpense({ amount: Number(amount), category, description, date });
    setAmount('');
    setDescription('');
  };

  return { amount, setAmount, category, setCategory, description, setDescription, date, setDate, handleSubmit };
};