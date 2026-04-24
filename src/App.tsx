import { useState, useReducer } from 'react'
import './App.css'

// types_____________________
interface Expense {
  id: number
  amount: number
  category: string
  description: string
  date: string
}

type Action =
  | { type: 'ADD'; payload: Expense }
  | { type: 'DELETE'; id: number }
  | { type: 'SET_FILTER'; filter: string }

interface State {
  expenses: Expense[]
  filter: string
}

// constants_____________________
const CATEGORIES = ['Еда', 'Транспорт', 'Развлечения', 'Здоровье', 'Одежда', 'Прочее']

const CATEGORY_COLORS: Record<string, { background: string; color: string }> = {
  'Еда':          { background: '#e6f7f0', color: '#00a67d' },
  'Транспорт':    { background: '#e6f0ff', color: '#0974d0' },
  'Развлечения':  { background: '#fde8ec', color: '#D22145' },
  'Здоровье':     { background: '#fce4ec', color: '#d6336c' },
  'Одежда':       { background: '#ede7f6', color: '#6c5ce7' },
  'Прочее':       { background: '#f0f0f0', color: '#636e72' },
}

const INITIAL_EXPENSES: Expense[] = [
  { id: 1, amount: 850,  category: 'Еда',          description: 'Пятёрочка', date: '2025-04-15' },
  { id: 2, amount: 120,  category: 'Транспорт',    description: 'Метро',     date: '2025-04-16' },
  { id: 3, amount: 600,  category: 'Развлечения',  description: 'Кино',      date: '2025-04-17' },
]

// store_____________________
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [action.payload, ...state.expenses] }
    case 'DELETE':
      return { ...state, expenses: state.expenses.filter(e => e.id !== action.id) }
    case 'SET_FILTER':
      return { ...state, filter: action.filter }
    default:
      return state
  }
}

function useExpenseStore() {
  const [state, dispatch] = useReducer(reducer, {
    expenses: INITIAL_EXPENSES,
    filter: 'Все',
  })

  const addExpense = (expense: Omit<Expense, 'id'>) =>
    dispatch({ type: 'ADD', payload: { ...expense, id: Date.now() } })

  const deleteExpense = (id: number) =>
    dispatch({ type: 'DELETE', id })

  const setFilter = (filter: string) =>
    dispatch({ type: 'SET_FILTER', filter })

  const filtered = state.filter === 'Все'
    ? state.expenses
    : state.expenses.filter(e => e.category === state.filter)

  const total = state.expenses.reduce((sum, e) => sum + e.amount, 0)
  const thisMonth = state.expenses
    .filter(e => e.date.startsWith('2025-04'))
    .reduce((sum, e) => sum + e.amount, 0)

  return { expenses: filtered, all: state.expenses, filter: state.filter, total, thisMonth, addExpense, deleteExpense, setFilter }
}

// components_____________________
function ExpenseForm({ onAdd }: { onAdd: (e: Omit<Expense, 'id'>) => void }) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Еда')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const handleSubmit = () => {
    if (!amount || !date) return
    onAdd({ amount: Number(amount), category, description, date })
    setAmount('')
    setDescription('')
  }

  return (
    <div className="card">
      <div className="cardTitle">Добавить расход</div>
      <div className="formGrid">
        <div className="field">
          <label>Сумма (₽)</label>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Категория</label>
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Описание</label>
          <input
            type="text"
            placeholder="На что?"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Дата</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <button className="btn btnPrimary" onClick={handleSubmit}>
          + Добавить
        </button>
      </div>
    </div>
  )
}

function ExpenseList({
  expenses,
  filter,
  onDelete,
  onFilter,
}: {
  expenses: Expense[]
  filter: string
  onDelete: (id: number) => void
  onFilter: (f: string) => void
}) {
  const filters = ['Все', ...CATEGORIES]

  return (
    <div className="card">
      <div className="cardTitle">История расходов</div>
      <div className="filterRow">
        {filters.map(f => (
          <button
            key={f}
            className={`filterChip ${filter === f ? 'active' : ''}`}
            onClick={() => onFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>
      {expenses.length === 0 ? (
        <div className="emptyState">Нет расходов в этой категории</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Категория</th>
              <th>Описание</th>
              <th>Сумма</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(e => (
              <tr key={e.id}>
                <td className="tdDate">{e.date}</td>
                <td>
                  <span className="categoryBadge" style={CATEGORY_COLORS[e.category]}>
                    {e.category}
                  </span>
                </td>
                <td>{e.description || '—'}</td>
                <td className="tdAmount">{e.amount.toLocaleString('ru')} ₽</td>
                <td>
                  <button className="deleteBtn" onClick={() => onDelete(e.id)}>✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// app_____________________
function App() {
  const { expenses, all, filter, total, thisMonth, addExpense, deleteExpense, setFilter } = useExpenseStore()
  const [page, setPage] = useState('main')

  const today = new Date().toLocaleDateString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <>
      <div className="sidebar">
        <div className="sidebarLogo">
          <div className="logoMark">₽</div>
          <div className="sidebarTitle">Мои расходы</div>
          <div className="sidebarSub">Личный бюджет</div>
        </div>

        <div className={`navItem ${page === 'main' ? 'active' : ''}`} onClick={() => setPage('main')}>
          ◉ Главная
        </div>
        <div className={`navItem ${page === 'add' ? 'active' : ''}`} onClick={() => setPage('add')}>
          + Добавить расход
        </div>
        <div className={`navItem ${page === 'cat' ? 'active' : ''}`} onClick={() => setPage('cat')}>
          ▤ Категории
        </div>

        <div className="sidebarBottom">
          <div className="userAvatar">A</div>
          <div className="userName">Арсений</div>
        </div>
      </div>

      <div className="main">
        <div className="topbar">
          <span className="topbarTitle">Обзор расходов</span>
          <span className="topbarDate">{today}</span>
        </div>

        <div className="content">
          <div className="statsRow">
            <div className="statCard">
              <div className="statLabel">Всего потрачено</div>
              <div className="statValue red">{total.toLocaleString('ru')} ₽</div>
              <div className="statSub">{all.length} записей</div>
            </div>
            <div className="statCard">
              <div className="statLabel">В этом месяце</div>
              <div className="statValue">{thisMonth.toLocaleString('ru')} ₽</div>
              <div className="statSub">Апрель 2025</div>
            </div>
            <div className="statCard">
              <div className="statLabel">Категорий</div>
              <div className="statValue">{new Set(all.map(e => e.category)).size}</div>
              <div className="statSub">Активных</div>
            </div>
          </div>

          <ExpenseForm onAdd={addExpense} />
          <ExpenseList
            expenses={expenses}
            filter={filter}
            onDelete={deleteExpense}
            onFilter={setFilter}
          />
        </div>
      </div>
    </>
  )
}

export default App