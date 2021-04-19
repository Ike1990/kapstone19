import React from "react";
import { useStore } from "../store/store";
import IndividualTodoComponent from "./IndividualTodoComponent";
import "../assets/projectboard.css";

export default function CompletedColumnComponent(props) {
  const todos = useStore((state) => state.currentProject.todos);
  return (
    <div className="outside">
      <h2>Completed</h2>
      <div id="inside1">
        {todos
          .filter((obj) => obj.completed)
          .map((obj) => (
            <IndividualTodoComponent
              key={obj.id}
              todo={obj}
              projectId={props.projectId}
            />
          ))}
      </div>
      <div id="dc2"></div>
    </div>
  );
}
