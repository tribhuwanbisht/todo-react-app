import { FaRegTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./todoItem.css";
import { Draggable } from "react-beautiful-dnd";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
function TodoItem({ todo, onDelete, onUpdate, onComplete, onDrag, idx }) {
  //Bootstrap Modal
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [currId, setCurrId] = useState();
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //
  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

  const [todoTitle, setTodoTitle] = React.useState(todo.title);
  const [todoDesc, setTodoDesc] = React.useState(todo.desc);

  useEffect(() => {
    todo.completed = isChecked;
    onComplete(todo);
    // eslint-disable-next-line
  }, [isChecked]);

  const titleChangeHandler = (event) => {
    setTodoTitle(event.target.value);
  };
  const descChangeHandler = (event) => {
    setTodoDesc(event.target.value);
  };

  const modalHandler = () => {
    // console.log("clicked");
    handleShowDetails();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    handleClose();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0");
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    const updatedTodo = {
      id: currId,
      title: todoTitle,
      desc: todoDesc,
      timeStamp: `${strTime}, ${today}`,
    };
    onUpdate(updatedTodo);

    setTodoTitle("");
    setTodoDesc("");
  };

  const checkHandler = (event) => {
    setIsChecked(event.target.checked);
    // setIsChecked(!isChecked);
  };

  return (
    <>
      <Draggable key={todo.id} draggableId={"draggable-" + todo.id} index={idx}>
        {(provided, snapshot) => (
          <Row
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...styles.todoRow,
              ...provided.draggableProps.style,
              boxShadow: snapshot.isDragging ? "0 0 .4rem #666" : "none",
            }}
          >
            <Col md={2}></Col>
            <InputGroup className="mb-6">
              <InputGroup.Checkbox
                aria-label="Checkbox for following text input"
                checked={isChecked}
                style={styles.checkbox}
                onChange={checkHandler}
              />
              <Col style={styles.todoCol}>
                <div onClick={modalHandler} style={styles.titleDiv}>
                  <span
                    style={{
                      textDecoration: isChecked ? "line-through" : "none",
                    }}
                  >
                    {todo.title}
                    <small style={styles.small}>{todo.timeStamp}</small>
                  </span>
                </div>
                <FaRegTrashAlt
                  style={styles.deleteButton}
                  onClick={() => {
                    onDelete(todo.id);
                  }}
                  className="deleteIcon"
                />

                <FaEdit
                  style={styles.updateIcon}
                  onClick={() => {
                    handleShow();
                    setCurrId(todo.id);
                  }}
                  className="updateIcon"
                />
              </Col>
            </InputGroup>
            <Col md={2}></Col>
          </Row>
        )}
      </Draggable>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Edit Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={todoTitle}
                onChange={titleChangeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Edit Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description  "
                value={todoDesc}
                onChange={descChangeHandler}
              />
            </Form.Group>
            <Button variant="outline-success" type="submit">
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Details Modal */}

      <Modal
        show={showDetails}
        onHide={handleCloseDetails}
        style={styles.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "grey",
            }}
          >
            {todo.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            style={{
              color: "#0dcaf0",
            }}
          >
            <span style={styles.spanHead}>Description: </span>
            👉 {todo.desc}
          </p>
          <p
            style={{
              color: "#8a2be2",
            }}
          >
            <span style={styles.spanHead}>Created At: </span>
            🕑 {todo.timeStamp}
          </p>
          <p
            style={{
              color: todo.completed ? "#78d41c" : "#f8bb04",
            }}
          >
            <span style={styles.spanHead}>Status: </span>
            {todo.completed ? "✅ completed" : "😐 pending"}
          </p>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </>
  );
}

export default TodoItem;

const styles = {
  todoCol: {
    textAlign: "left",
    backgroundColor: "#98ddeb",
    padding: "5px",
    borderRadius: "0px 7px 7px 0px",
    color: "white",
    fontSize: "25px",
    // backgroundImage: "linear-gradient(to right, #fdeb82, #f78fad)",
    // backgroundImage: "linear-gradient(to right, #54E38E, #41C7AF)",
    backgroundImage: "linear-gradient(to right,rgb(27 74 46), rgb(38 217 192))",
  },
  deleteButton: {
    float: "right",
    color: "red",
    fontSize: "20px",

    marginRight: "2px",
  },
  updateIcon: {
    float: "right",
    color: "#34b334",

    fontSize: "21px",

    marginRight: "5px",
  },

  todoRow: {
    padding: "5px",
  },
  span: {
    textAlign: "left",
  },
  small: {
    position: "absolute",

    top: "40px",
    left: "63px",
    fontSize: "12px",
  },
  checkbox: {
    fontSize: "20px",
    padding: "0px",

    margin: "0px",
    border: "0px",
  },
  titleDiv: {},
  spanHead: {
    fontSize: "18px",
    // letterSpacing: "1px",
    color: "grey",
  },
  // para: {
  //   color: "#0dcaf0",
  // },
  modal: {},
};
