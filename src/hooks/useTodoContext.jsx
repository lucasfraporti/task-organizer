import { useContext } from "react";

import { TodoContext } from "../context/TodoContext";

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    console.log("Context não encontrado...");
  }
  return context;
};
