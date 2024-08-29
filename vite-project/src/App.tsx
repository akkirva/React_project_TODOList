import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Item from './Item.tsx'

function App() {
  const initialTodos = ['Learn', 'Read', 'Eat','Sleep']

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos') ?? []) || initialTodos)

  const addTodoHandler = (e) => setTodos([...todos, e.target.value])
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <div>
        {todos.map((el: string, index) => {
          return <div key={index}><Item />{el}</div>
        })}
      </div>

      <form>
        <label>
          <input type="text" placeholder='Ввести задачу'/>
          <button type='submit'           
            onClick={addTodoHandler}>
            Добавить
          </button>
        </label>
      </form>

      <div>
        {todos.length >= 4 && <p>Всего задач: {todos.length}</p>}
      </div>
    </>
  )
}

export default App
