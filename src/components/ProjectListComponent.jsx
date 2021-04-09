import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/store";
// Things to display: A list of project titles from global store.
export default function ProjectListComponent() {
  const toDoProjectBoards = useStore((state) => state.todoProjectBoards);
  return (
    <div>
      {toDoProjectBoards.map((toDoProject) => (
        <h2 key={toDoProject.projectId}>
          <Link to={"/projectBoard/" + toDoProject.projectId}>
            {toDoProject.projectTitle}
          </Link>
        </h2>
      ))}
    </div>
  );
}
