import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../store/store";
import "../assets/profile.css";
// Things to display: A list of project titles from global store.
export default function ProjectListComponent() {
  const toDoProjectBoards = useStore((state) => state.todoProjectBoards);
  const storeSetProjects = useStore((state) => state.storeSetProjects);
  useEffect(() => {
    storeSetProjects();
  }, [storeSetProjects]);
  return (
    <div id="pplist">
      {toDoProjectBoards.map((toDoProject) => (
        <div className="project" key={toDoProject.projectId}>
          <h2>
            <Link to={"/projectBoard/" + toDoProject.projectId}>
              {toDoProject.projectTitle}
            </Link>
          </h2>
        </div>
      ))}
    </div>
  );
}
