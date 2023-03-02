import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";
import { DragDropContext } from "react-beautiful-dnd";

import { useState, useEffect } from "react";
function App() {
  let init;
  if (localStorage.getItem("allTodos") === null) {
    init = [];
  } else {
    init = JSON.parse(localStorage.getItem("allTodos"));
  }

  const [todos, setTodos] = useState(init);
  useEffect(() => {
    localStorage.setItem("allTodos", JSON.stringify(todos));
  }, [todos]);

  const addTodoHandler = (todo) => {
    setTodos((prevTodoItems) => prevTodoItems.concat(todo));
  };

  const deleteTodoHandler = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const updateTodoHandler = (updatedTodo) => {
    // console.log(updatedTodo);
    const todoIndex = todos.findIndex((todo) => todo.id === updatedTodo.id);
    setTodos(
      todos.map((todo, index) =>
        index === todoIndex ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const completeTodoHandler = (updatedTodo) => {
    const todoIndex = todos.findIndex((todo) => todo.id === updatedTodo.id);
    setTodos(
      todos.map((todo, index) => (index === todoIndex ? updatedTodo : todo))
    );
  };

  const dragTodoHandler = () => {};

  return (
    <div className="App" style={styles.mainContainer}>
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            todos.splice(desI, 0, todos.splice(srcI, 1)[0]);
            localStorage.setItem("allTodos", JSON.stringify(todos));
          }
        }}
      >
        <h1 style={styles.heading}>My Todo React App 📋</h1>
        <AddTodo onAddTodo={addTodoHandler} />
        <TodoList
          todos={todos}
          onDelete={deleteTodoHandler}
          onUpdate={updateTodoHandler}
          onComplete={completeTodoHandler}
          onDrag={dragTodoHandler}
        />
      </DragDropContext>
    </div>
  );
}

export default App;

const styles = {
  heading: {
    padding: "10px",
    // color: "rgb(68 80 160)",
    color: "#0f5132",
    textShadow: "1px 1px 3px #198754",
  },
  mainContainer: {
    minHeight: "100vh",

    // backgroundImage: "linear-gradient(to right, #c4e759, #6de195)",
    backgroundImage: "linear-gradient(to right, rgb(220 244 149), #6de195)",
  },
};
