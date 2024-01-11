import { useEffect, useState } from "react";
import "./App.css";
import { useRef } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();
  const handleAddTodo = () => {
    const text = inputRef.current.value.trim();
    if (text === "") {
      return;
    }
    const newItem = { completed: false, text };
    setTodos([...todos, newItem]);
    inputRef.current.value = "";
    localStorage.setItem("todos", JSON.stringify([...todos, newItem]));
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem("todos");
    if (savedTasks) {
      setTodos(JSON.parse(savedTasks));
    }
  }, []);

  const handelItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  const handelDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  return (
    <div className="App">
      <h2>To Do List</h2>
      <div className="to-do-container">
        <div className="components">
          <input ref={inputRef} placeholder="Enter a task..." />
          <button onClick={handleAddTodo}>Add Task</button>
        </div>
        <ul>
          {todos.map(({ text, completed }, index) => {
            return (
              <div className="item">
                <li
                  className={completed ? "done" : ""}
                  key={index}
                  onClick={() => handelItemDone(index)}
                >
                  {text}
                </li>
                <span
                  className="remove"
                  onClick={() => handelDeleteItem(index)}
                >
                  ❌
                </span>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
export default App;
