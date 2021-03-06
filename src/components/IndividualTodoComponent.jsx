import React, { useState } from "react";
import Moment from "react-moment";
import { Button, Form, Input } from "semantic-ui-react";
import { useStore } from "../store/store";

export default function IndividualTodoComponent(props) {
  //props
  const { text, id, completed, createdBy, createdDate } = props.todo;
  const projectId = props.projectId;

  //global store
  const storeToggleTodoCompleted = useStore(
    (state) => state.storeToggleTodoCompleted
  );
  const storeDeleteTodo = useStore((state) => state.storeDeleteTodo);
  const storeEditTodo = useStore((state) => state.storeEditTodo);

  //local State
  const [editMode, setEditMode] = useState(false);
  const [editedTodo, setEditedTodo] = useState(text);
  //functions
  const handleToggle = () => {
    storeToggleTodoCompleted(projectId, !completed, id);
  };
  const handleDelete = () => {
    storeDeleteTodo(projectId, id);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    storeEditTodo(projectId, editedTodo, id);
    setEditMode(false);
  };
  return (
    <div id="itc">
      {editMode ? (
        <Form onSubmit={handleEdit}>
          <Input
            id="newinput"
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
            placeholder="New Todo"
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              setEditMode((prev) => !prev);
              setEditedTodo(text);
            }}
            negative
          >
            Cancel
          </Button>
          <Button onClick={handleEdit} positive>
            Edit
          </Button>
        </Form>
      ) : (
        <div onClick={() => setEditMode((prev) => !prev)} id="tt">
          {text}
        </div>
      )}
      <p>Created by: {createdBy}</p>
      {createdDate && <Moment format="MMM D, YYYY">{createdDate}</Moment>}
      <br />
      {!completed && !editMode && (
        <Button onClick={handleDelete} negative>
          Delete
        </Button>
      )}
      {!editMode && (
        <Button onClick={handleToggle} positive>
          {completed ? "unDone" : "Done"}
        </Button>
      )}
    </div>
  );
}
