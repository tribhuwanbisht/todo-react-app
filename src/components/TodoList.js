import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Droppable } from "react-beautiful-dnd";

function TodoList({ todos, onDelete, onUpdate, onComplete, onDrag }) {
  let [filterStatus, setFilterStatus] = useState("all");
  let [checkedTodos, setCheckedTodos] = useState(todos);

  useEffect(() => {
    if (filterStatus === "all") {
      setCheckedTodos(todos);
    } else if (filterStatus === "completed") {
      setCheckedTodos(todos.filter((todo) => todo.completed === true));
    } else {
      setCheckedTodos(todos.filter((todo) => todo.completed === false));
    }
  }, [filterStatus, todos]);

  const onChangeHandler = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <>
      <Row>
        <Col md={5}></Col>
        <Col md={2}>
          <Form.Select
            aria-label="Default select example"
            value={filterStatus}
            onChange={onChangeHandler}
          >
            <option value="all">Select All</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </Form.Select>
        </Col>
      </Row>

      <Container style={styles.todoContainer}>
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {todos.length === 0
                ? "No Todos to display"
                : checkedTodos.map((todo, i) => {
                    return (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onDelete={onDelete}
                        onUpdate={onUpdate}
                        onComplete={onComplete}
                        onDrag={onDrag}
                        idx={i}
                      />
                    );
                  })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Container>
    </>
  );
}

export default TodoList;

const styles = {
  todoContainer: {
    borderRadius: "10px",
    maxWidth: "800px",
    padding: "10px",
    // backgroundImage: "linear-gradient(to right, #c4e759, #6de195)",
  },
};
