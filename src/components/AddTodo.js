import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function AddTodo(props) {
  //Bootstrap Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [todoTitle, setTodoTitle] = React.useState("");
  const [todoDesc, setTodoDesc] = React.useState("");

  const titleChangeHandler = (event) => {
    setTodoTitle(event.target.value);
  };
  const descChangeHandler = (event) => {
    setTodoDesc(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    handleClose();

    if (!todoTitle || !todoDesc) {
      alert("Title or Description cannot be blank");
    }
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

    const newTodo = {
      id: Math.random().toString(16).slice(2),
      title: todoTitle,
      desc: todoDesc,
      completed: false,
      timeStamp: `${strTime}, ${today}`,
    };

    props.onAddTodo(newTodo);
    setTodoTitle("");
    setTodoDesc("");
  };

  return (
    <>
      <Button
        variant="outline-primary"
        onClick={handleShow}
        style={styles.addTodoButton}
      >
        Add Task
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Add Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={todoTitle}
                onChange={titleChangeHandler}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Add Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description  "
                value={todoDesc}
                onChange={descChangeHandler}
              />
            </Form.Group>
            <Button variant="success" type="submit">
              Add Todo
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddTodo;

const styles = {
  addTodoButton: {
    marginBottom: "10px",
  },
};
