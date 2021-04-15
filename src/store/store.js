import { nanoid } from "nanoid";
import create from "zustand";
import { devtools } from "zustand/middleware";
import { db } from "../dummyDb/dummyDb";
const baseURL = "http://localhost:3000/";
export const useStore = create(
  devtools((set, get) => ({
    // current users name
    user: "",
    //all users projects
    todoProjectBoards: [],
    //current Projects
    currentProject: {
      userName: [],
      projectTitle: "",
      columnNames: [],
      todos: [],
      projectId: "",
    },
    storeHandleLogin: (username, password) => {
      fetch(baseURL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            set({
              user: response.content.username,
              todoProjectBoards: response.content.projects,
              currentProject: response.content.currentProject
                ? response.content.currentProject
                : {
                    userName: [],
                    projectTitle: "",
                    columnNames: [],
                    todos: [],
                    projectId: "",
                  },
            });
            alert("Your sign in was a success");
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeHandleSignUp: (username, password) => {
      fetch(baseURL + "signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            alert(response.message);
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeSetProjects: () => {
      if (get().user) {
        fetch(baseURL + "projects/" + get().user)
          .then((res) => res.json())
          .then((response) => {
            if (response.statusCode < 300) {
              set({ todoProjectBoards: response.content });
            } else {
              alert(
                `Error code: ${response.statusCode} \r\n ${response.message}`
              );
              throw new Error(`${response.message}`);
            }
          })
          .catch((error) => console.log(error.message));
      }
    },
    storeSetCurrentProject: (projectId) => {
      const currentProject = get().todoProjectBoards.find(
        (project) => project.projectId === projectId
      );
      if (currentProject !== undefined) {
        set({ currentProject: currentProject });
      } else {
        set({
          currentProject: {
            userName: [],
            projectTitle: "",
            columnNames: [],
            todos: [],
            projectId: "",
          },
        });
      }
    },
    storeCreateNewProject: (title) => {
      const projectTitle = title ? title : `${get().user}'s Project`;
      fetch(baseURL + "projects/" + get().user, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: projectTitle,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            get().storeSetProjects();
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeAddNewTodo: (projectId, text, columnPosition) => {
      fetch(baseURL + "project/todo/" + projectId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          columnPosition: columnPosition,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            set({ currentProject: response.content });
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeAddNewColumn: (projectId, columnTitle) => {
      fetch(baseURL + "project/column/" + projectId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columnTitle: columnTitle,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            set({ currentProject: response.content });
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeAddProjectUsers: (projectId, newUser) => {
      fetch(baseURL + "project/users/" + projectId, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUser: newUser,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            set({ currentProject: response.content });
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeDeleteColumn: (projectId, columnId) => {
      fetch(baseURL + "project/column/" + projectId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          columnId: columnId,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            set({ currentProject: response.content });
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeToggleTodoCompleted: (projectId, boolean, todoId) => {
      fetch(baseURL + "project/todo/completed/" + projectId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boolean: boolean,
          todoId: todoId,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            set({ currentProject: response.content });
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeDeleteTodo: (projectId, todoId) => {
      fetch(baseURL + "project/todo/" + projectId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          todoId: todoId,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            set({ currentProject: response.content });
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeEditTodo: (projectId, text, todoId) => {
      fetch(baseURL + "project/todo/text/" + projectId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          todoId: todoId,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            set({ currentProject: response.content });
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
    storeLogout: () => {
      set({
        user: "",
        //all users projects
        todoProjectBoards: [],
        //current Projects
        currentProject: {
          userName: [],
          projectTitle: "",
          columnNames: [],
          todos: [],
          projectId: "",
        },
      });
    },
    storeDeleteUser: (username, password) => {
      fetch(baseURL + "user/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode < 300) {
            get().storeLogout();
          } else {
            alert(
              `Error code: ${response.statusCode} \r\n ${response.message}`
            );
            throw new Error(`${response.message}`);
          }
        })
        .catch((error) => console.log(error.message));
    },
  }))
);
