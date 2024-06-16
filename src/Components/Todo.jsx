import { useEffect, useRef, useState } from 'react';
import './CSS/Todo.css';
import TodoItems from './TodoItems';

let count = 0;
const Todo = () => {
    const [todos, setTodos] = useState([]);
    const inputRef = useRef(null);
    const add = () => {
        setTodos([...todos, {no:count++, text:inputRef.current.value, display: ""}])
        inputRef.current.value = "";
        localStorage.setItem("todos_count", count)
    }
    useEffect(() => {
        setTodos(JSON.parse(localStorage.getItem("todos")))
        count = localStorage.getItem("todos_count")
    }, [])
    useEffect(() => {
        setTimeout(() => {
            localStorage.setItem('todos', JSON.stringify(todos))
        },1000)
    }, [todos])
  return (
    <div className='todo'>
        <div className="todo-header">To-Do List</div>
        <div className="todo-add">
            <input type="text" placeholder='Add Your Task' className='todo-input' ref={inputRef} />
            <div className="todo-add-btn" onClick={() => {add()}}>Add</div>
        </div>
        <div className="todo-list">
            {
                todos.map((item) => {
                    return <TodoItems key={item.no} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/>
                })                
            }
        </div>
    </div>
  )
}

export default Todo