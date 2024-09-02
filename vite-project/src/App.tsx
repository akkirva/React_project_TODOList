import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Item from './Item.tsx'

function App() {
  const initialTodos = [
    {id: 1, title: 'Learn'}, 
    {id: 2, title: 'Read'}, 
    {id: 3, title: 'Eat'},
    {id: 4, title:'Sleep'}
  ]

  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem('todos') ?? JSON.stringify(initialTodos)))
  const inputRef = useRef<any>(null);
  const addTodoHandler = () => setTodos([...todos, inputRef.current.value])
  

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])  

  function deletTodo(id) {
    const newTodos = todos.filter((el) => el.id !== id);
    setTodos(newTodos);
  }

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
        {todos.map((el) => {
          return <div key={el.id}><Item />{el.title}</div>
          })}
      </div>

      <form>
        <label>
          <input type="text" placeholder='Ввести задачу'
            ref={inputRef}
          />

          <button type='submit'           
            onClick={addTodoHandler}>
            Добавить
          </button>

          <button type='button'           
            onClick={(el) => deletTodo(el.id)}>
            Удалить
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
