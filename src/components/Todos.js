import React, { useState, useReducer } from "react";
import Todo from "./Todo";
import "./Todos.css";

export const ACTIONS = {
  ADD_TODO: "add_todo",
  DELETE_TODO: "delete_todo",
  TOGGLE_TODO: "toggle_todo",
};

const reducer = (todos, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)];
    case ACTIONS.TOGGLE_TODO:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    case ACTIONS.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    default:
      return todos;
  }
};
const newTodo = (name) => {
  return {
    id: Date.now(),
    name,
    completed: false,
  };
};

const Todos = () => {
  const [todos, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };
  return (
    <div className="todos">
      <div className="todos__content">
        <h1>Todo App</h1>
        <div className="todos__form">
          <form className="todos__form" onSubmit={handleSubmit}>
            <input
              className="todos__input"
              value={name}
              placeholder="Add Todo Item"
              onChange={(e) => setName(e.target.value)}
            />
          </form>
          <button className="todos__add__btn" onClick={handleSubmit}>
            Add Todo
          </button>
        </div>
        <div className="todos__todo">
          {todos.map((todo) => {
            return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Todos;
