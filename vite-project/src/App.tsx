import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Item from './Item.tsx'
import { ListTodo } from './types.ts'

function App() {
  const initialTodos: ListTodo[] = [
    {id: 1, title: 'Learn'}, 
    {id: 2, title: 'Read'}, 
    {id: 3, title: 'Eat'},
    {id: 4, title:'Sleep'}
  ]

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos') ?? JSON.stringify(initialTodos))
  );
  
  const inputRef = useRef<any>(null);

  const addTodoHandler = () => setTodos([...todos, inputRef.current])
  
  function deleteTodo(id: number) {
    const newTodos = todos.filter((el: ListTodo) => el.id !== id);
    setTodos(newTodos);
  }

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
      {todos.map((el: ListTodo) => {
          return <div>
                  <Item key={el.id} el={el} deleteTodos={deleteTodo}/>
                </div>
          })}

      <form>
        <label>
          <input type="text" placeholder='Ввести задачу'
            ref={inputRef}
            onChange={(event) =>
              ((inputRef.current as unknown as string) = event.target.value)
            }
          />

          <button type='submit'           
            onClick={addTodoHandler}>
            Добавить
          </button>

        </label>
      </form>      
     
      <div>
        {todos.length >= 4 && <p>Всего задач: {todos.length}</p>}
      </div>
      </div>
    </>
  )
}

export default App
