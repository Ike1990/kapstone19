import React, { useState } from "react";
import { useStore } from "../store/store";
import "../assets/addcolumn.css";
import { Button, Input } from "semantic-ui-react";

export default function AddColumnComponent(props) {
  const { columnNames, projectId } = useStore((state) => state.currentProject);
  const storeAddNewColumn = useStore((state) => state.storeAddNewColumn);
  const [newColumn, setNewColumn] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    if (
      !columnNames.some(
        (column) => column.name.toLowerCase() === newColumn.toLowerCase()
      ) &&
      newColumn.toLowerCase() !== "completed" &&
      newColumn
    ) {
      storeAddNewColumn(projectId, newColumn);
    }
    props.addColumnButton();
  };
  return (
    <div id="box">
      <form onSubmit={handleClick}>
        <Input
          className="newinput"
          value={newColumn}
          onChange={(e) => setNewColumn(e.target.value)}
          placeholder="New Column"
        />
        <Button className="button" onClick={handleClick} positive>
          Submit
        </Button>
        <Button className="button" onClick={props.addColumnButton} negative>
          Cancel
        </Button>
      </form>
    </div>
  );
}
